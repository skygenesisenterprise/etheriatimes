"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RefreshCw,
  Download,
  Search,
  Trash2,
  Filter,
  Terminal,
  Play,
  Pause,
} from "lucide-react";
import { dockerApi } from "@/lib/api/docker";

// Services defined in docker-compose.yml
const DOCKER_SERVICES = [
  { id: "server", name: "Frontend", description: "Next.js server", icon: "🌐" },
  { id: "worker", name: "API Worker", description: "Go backend", icon: "⚙️" },
  { id: "postgresql", name: "PostgreSQL", description: "Database", icon: "🐘" },
  { id: "redis", name: "Redis", description: "Cache & sessions", icon: "🔴" },
  { id: "rabbitmq", name: "RabbitMQ", description: "Message broker", icon: "🐰" },
  { id: "meilisearch", name: "Meilisearch", description: "Search engine", icon: "🔍" },
] as const;

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  service: string;
  raw: string;
}

function parseLogLine(line: string, service: string): LogEntry {
  // Try to parse structured log format: [TIMESTAMP] [LEVEL] message
  const structuredMatch = line.match(
    /^\[?(\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}[^\]]*)\]?\s*\[?(\w+)\]?\s*(.*)$/i
  );

  if (structuredMatch) {
    const level = structuredMatch[2].toLowerCase();
    const validLevels = ["info", "warn", "error", "debug"];
    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: structuredMatch[1],
      level: validLevels.includes(level) ? (level as LogEntry["level"]) : "info",
      message: structuredMatch[3],
      service,
      raw: line,
    };
  }

  // Try JSON log format: {"time":"...","level":"...","msg":"..."}
  try {
    const json = JSON.parse(line);
    if (json.time && json.level && json.msg) {
      const level = json.level.toLowerCase();
      const validLevels = ["info", "warn", "error", "debug"];
      return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        timestamp: json.time,
        level: validLevels.includes(level) ? (level as LogEntry["level"]) : "info",
        message: json.msg,
        service,
        raw: line,
      };
    }
  } catch {
    // Not JSON
  }

  // Fallback: detect level from content
  const lowerLine = line.toLowerCase();
  let level: LogEntry["level"] = "info";
  if (lowerLine.includes("error") || lowerLine.includes("panic") || lowerLine.includes("fatal")) {
    level = "error";
  } else if (lowerLine.includes("warn") || lowerLine.includes("deprecated")) {
    level = "warn";
  } else if (lowerLine.includes("debug") || lowerLine.includes("trace")) {
    level = "debug";
  }

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    level,
    message: line,
    service,
    raw: line,
  };
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [selectedServices, setSelectedServices] = useState<string[]>(["server", "worker"]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [serviceStatuses, setServiceStatuses] = useState<Record<string, boolean>>({});
  const logContainerRef = useRef<HTMLDivElement>(null);
  const fetchedIdsRef = useRef<Set<string>>(new Set());

  const fetchServiceLogs = useCallback(
    async (serviceId: string) => {
      try {
        const response = await dockerApi.getLogs(serviceId, 50);
        if (response.success) {
          const rawLogs = response.data?.logs || response.logs || [];
          const parsed = rawLogs
            .filter((line: string) => {
              const entry = parseLogLine(line, serviceId);
              if (fetchedIdsRef.current.has(entry.raw + entry.service)) return false;
              fetchedIdsRef.current.add(entry.raw + entry.service);
              return true;
            })
            .map((line: string) => parseLogLine(line, serviceId));

          setServiceStatuses((prev) => ({ ...prev, [serviceId]: true }));
          return parsed;
        }
        setServiceStatuses((prev) => ({ ...prev, [serviceId]: false }));
        return [];
      } catch {
        setServiceStatuses((prev) => ({ ...prev, [serviceId]: false }));
        return [];
      }
    },
    []
  );

  const fetchAllLogs = useCallback(async () => {
    const allLogs: LogEntry[] = [];
    for (const serviceId of selectedServices) {
      const serviceLogs = await fetchServiceLogs(serviceId);
      allLogs.push(...serviceLogs);
    }
    if (allLogs.length > 0) {
      setLogs((prev) => {
        const combined = [...allLogs, ...prev];
        // Keep only last 500 entries
        return combined.slice(0, 500);
      });
    }
    setLastUpdated(new Date().toLocaleTimeString("fr-FR"));
  }, [selectedServices, fetchServiceLogs]);

  useEffect(() => {
    fetchedIdsRef.current.clear();
    setLogs([]);
    fetchAllLogs();
  }, [selectedServices]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchAllLogs, 3000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchAllLogs]);

  // Auto-scroll to top when new logs arrive
  useEffect(() => {
    if (logContainerRef.current && logs.length > 0) {
      logContainerRef.current.scrollTop = 0;
    }
  }, [logs.length]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = !searchQuery || log.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    const matchesService = serviceFilter === "all" || log.service === serviceFilter;
    return matchesSearch && matchesLevel && matchesService;
  });

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleClear = () => {
    setLogs([]);
    fetchedIdsRef.current.clear();
  };

  const handleDownload = () => {
    const content = filteredLogs
      .map((log) => `[${log.timestamp}] [${log.level.toUpperCase()}] [${log.service}] ${log.message}`)
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `etheriatimes-logs-${new Date().toISOString().split("T")[0]}.log`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      info: "bg-blue-500/15 text-blue-400 border-blue-500/30",
      warn: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
      error: "bg-red-500/15 text-red-400 border-red-500/30",
      debug: "bg-gray-500/15 text-gray-400 border-gray-500/30",
    };
    return colors[level] || colors.info;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Logs</h1>
          <p className="text-sm text-muted-foreground">
            Logs en temps réel des services Docker Compose
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchAllLogs}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="sm" onClick={handleClear}>
            <Trash2 className="h-4 w-4 mr-2" />
            Effacer
          </Button>
        </div>
      </div>

      {/* Service selection */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <CardTitle className="text-base">Services Docker</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {Object.values(serviceStatuses).filter(Boolean).length}/{DOCKER_SERVICES.length} connectés
              </span>
            </div>
          </div>
          <CardDescription>
            Sélectionnez les services à monitorer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {DOCKER_SERVICES.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              const isConnected = serviceStatuses[service.id];
              return (
                <button
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <span>{service.icon}</span>
                  <span>{service.name}</span>
                  {isConnected !== undefined && (
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isConnected ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Logs console */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">Console</CardTitle>
              <CardDescription>
                {filteredLogs.length} entrées • Dernière mise à jour: {lastUpdated || "—"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors ${
                    autoRefresh
                      ? "bg-green-500/15 text-green-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {autoRefresh ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                  {autoRefresh ? "En direct" : "Pause"}
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans les logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {DOCKER_SERVICES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.icon} {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Log entries */}
          <div
            ref={logContainerRef}
            className="rounded-md border bg-[#1e1e1e] max-h-[500px] overflow-y-auto"
          >
            {filteredLogs.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Terminal className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Aucun log trouvé</p>
                <p className="text-xs mt-1">
                  Sélectionnez un service et activez l&apos;auto-refresh
                </p>
              </div>
            ) : (
              <div className="font-mono text-xs">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex gap-3 border-b border-[#2d2d2d] px-4 py-1.5 hover:bg-[#2a2d2e]"
                  >
                    <span className="text-[#6a9955] whitespace-nowrap shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString("fr-FR")}
                    </span>
                    <span className="shrink-0">
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${getLevelColor(
                          log.level
                        )}`}
                      >
                        {log.level.toUpperCase()}
                      </span>
                    </span>
                    <span className="text-[#569cd6] whitespace-nowrap shrink-0">
                      [{DOCKER_SERVICES.find((s) => s.id === log.service)?.name || log.service}]
                    </span>
                    <span className="text-[#d4d4d4] break-all">{log.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
