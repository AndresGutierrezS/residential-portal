import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Event } from "../interfaces/event.interface";

interface Props {
  events: Event[];

  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
}

export const EventsTable = ({
  events,
  onEdit,
  onDelete,
}: Props) => {

  if (events.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No hay eventos
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Ubicación</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Cupo</TableHead>

          <TableHead className="text-right">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">
              {event.title}
            </TableCell>

            <TableCell>
              {new Date(event.event_date)
                .toLocaleDateString()}
            </TableCell>

            <TableCell>
              {event.location}
            </TableCell>

            <TableCell>
              {event.type}
            </TableCell>

            <TableCell>
              {event.max_attendees ?? "-"}
            </TableCell>

            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(event)}
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(event)}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};