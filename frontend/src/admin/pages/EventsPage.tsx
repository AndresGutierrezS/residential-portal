import { useState } from "react";
import { Plus, Search, CalendarDays, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LoadingSpinner } from "@/components/custom/LoadingSpinner";

import { toast } from "sonner";



import { useRequestTransition } from "@/hooks/useRequestTransition";
import { useEventsApi } from "../events/hooks/useEventsApi";
import { EventsTable } from "../events/components/EventsTable";
import { EventFormDialog } from "../events/components/EventFormDialog";
import { DeleteEventDialog } from "../events/components/DeleteEventDialog";
import type { Event } from "../events/interfaces/event.interface";

export const EventsPage = () => {
  const {
    eventsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useEventsApi();

  const { execute, loading } = useRequestTransition();

  const events = eventsQuery.data ?? [];

  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const upcomingEvents = events.filter(
    (event) => new Date(event.event_date) >= new Date()
  ).length;

  const uniqueLocations = new Set(
    events
      .map((event) => event.location)
      .filter(Boolean)
  ).size;

  const totalCapacity = events.reduce(
    (total, event) => total + (event.max_attendees ?? 0),
    0
  );

  const filteredEvents = events.filter((event) => {
    const query = search.toLowerCase();

    return (
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.type.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query)
    );
  });

  const handleCreate = (data: any) => {
    execute(async () => {
      try {
        await createMutation.mutateAsync(data);

        toast.success("Evento creado");

        setCreateOpen(false);
      } catch (error) {
        toast.error("No se pudo crear el evento");
      }
    });
  };

  const handleUpdate = (data: any) => {
    if (!selectedEvent) return;

    execute(async () => {
      try {
        await updateMutation.mutateAsync({
          id: selectedEvent.id,
          event: data,
        });

        toast.success("Evento actualizado");

        setEditOpen(false);
        setSelectedEvent(null);
      } catch (error) {
        toast.error("No se pudo actualizar el evento");
      }
    });
  };

  const handleDelete = () => {
    if (!selectedEvent) return;

    execute(async () => {
      try {
        await deleteMutation.mutateAsync(selectedEvent.id);

        toast.success("Evento eliminado");

        setDeleteOpen(false);
        setSelectedEvent(null);
      } catch (error) {
        toast.error("No se pudo eliminar el evento");
      }
    });
  };

  if (eventsQuery.isLoading) {
    return <LoadingSpinner show />;
  }

  return (
    <>
      <LoadingSpinner show={loading} />

      <div className="space-y-6">

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Eventos
            </h1>

            <p className="text-gray-500">
              Gestión de eventos del condominio
            </p>
          </div>

          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Eventos
              </CardTitle>

              <div className="bg-blue-50 p-2 rounded-lg">
                <CalendarDays className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {events.length}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Próximos Eventos
              </CardTitle>

              <div className="bg-green-50 p-2 rounded-lg">
                <CalendarDays className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {upcomingEvents}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Pendientes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Capacidad Total
              </CardTitle>

              <div className="bg-purple-50 p-2 rounded-lg">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {totalCapacity}
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Lugares disponibles
              </p>
            </CardContent>
          </Card>

        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

          <Input
            className="pl-10"
            placeholder="Buscar por título, descripción, tipo o ubicación..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Listado de Eventos
            </CardTitle>
          </CardHeader>

          <CardContent>
            <EventsTable
              events={filteredEvents}
              onEdit={(event) => {
                setSelectedEvent(event);
                setEditOpen(true);
              }}
              onDelete={(event) => {
                setSelectedEvent(event);
                setDeleteOpen(true);
              }}
            />
          </CardContent>
        </Card>

        <EventFormDialog
          open={isCreateOpen}
          onOpenChange={setCreateOpen}
          onSubmit={handleCreate}
        />

        <EventFormDialog
          open={isEditOpen}
          onOpenChange={setEditOpen}
          defaultValues={selectedEvent}
          onSubmit={handleUpdate}
        />

        <DeleteEventDialog
          open={isDeleteOpen}
          onOpenChange={setDeleteOpen}
          onConfirm={handleDelete}
        />

      </div>
    </>
  );
};
