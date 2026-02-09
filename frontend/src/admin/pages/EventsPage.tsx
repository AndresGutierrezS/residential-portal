import { useState } from "react";
import { Calendar, Plus, Users, BarChart3, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  attendees: number;
  maxAttendees?: number;
  poll?: Poll;
}

export const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Reunión de Copropietarios",
      description: "Reunión ordinaria para tratar asuntos del condominio",
      date: "2026-01-31",
      time: "18:00",
      location: "Salón Comunal",
      type: "Asamblea",
      attendees: 24,
      maxAttendees: 50,
      poll: {
        id: "p1",
        question: "¿Apruebas el incremento del 5% en la cuota de mantenimiento?",
        options: [
          { id: "o1", text: "Sí, apruebo", votes: 18 },
          { id: "o2", text: "No, rechazo", votes: 5 },
          { id: "o3", text: "Me abstengo", votes: 1 },
        ],
        totalVotes: 24,
      },
    },
    {
      id: "2",
      title: "Día de la Familia",
      description: "Actividades recreativas para toda la familia",
      date: "2026-02-15",
      time: "10:00",
      location: "Área de Piscina",
      type: "Social",
      attendees: 45,
      maxAttendees: 80,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPollDialogOpen, setIsPollDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "Asamblea",
    maxAttendees: "",
  });

  const [pollData, setPollData] = useState({
    question: "",
    options: ["", "", ""],
  });

  const handleAdd = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      type: formData.type,
      attendees: 0,
      maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
    };
    setEvents([...events, newEvent]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("Evento creado exitosamente");
  };

  const handleEdit = () => {
    if (!selectedEvent) return;
    setEvents(
      events.map((e) =>
        e.id === selectedEvent.id
          ? {
              ...e,
              title: formData.title,
              description: formData.description,
              date: formData.date,
              time: formData.time,
              location: formData.location,
              type: formData.type,
              maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
            }
          : e
      )
    );
    setIsEditDialogOpen(false);
    setSelectedEvent(null);
    resetForm();
    toast.success("Evento actualizado exitosamente");
  };

  const handleDelete = () => {
    if (!selectedEvent) return;
    setEvents(events.filter((e) => e.id !== selectedEvent.id));
    setIsDeleteDialogOpen(false);
    setSelectedEvent(null);
    toast.success("Evento eliminado exitosamente");
  };

  const handleAddPoll = () => {
    if (!selectedEvent) return;
    const newPoll: Poll = {
      id: Date.now().toString(),
      question: pollData.question,
      options: pollData.options
        .filter((opt) => opt.trim() !== "")
        .map((opt, idx) => ({
          id: `opt-${idx}`,
          text: opt,
          votes: 0,
        })),
      totalVotes: 0,
    };
    
    setEvents(
      events.map((e) =>
        e.id === selectedEvent.id ? { ...e, poll: newPoll } : e
      )
    );
    setIsPollDialogOpen(false);
    setSelectedEvent(null);
    resetPollForm();
    toast.success("Encuesta creada exitosamente");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      type: "Asamblea",
      maxAttendees: "",
    });
  };

  const resetPollForm = () => {
    setPollData({
      question: "",
      options: ["", "", ""],
    });
  };

  const openEditDialog = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      maxAttendees: event.maxAttendees?.toString() || "",
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const openPollDialog = (event: Event) => {
    setSelectedEvent(event);
    setIsPollDialogOpen(true);
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollData.options];
    newOptions[index] = value;
    setPollData({ ...pollData, options: newOptions });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
          <p className="text-gray-600 mt-1">Gestión de eventos y encuestas en vivo</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{event.type}</Badge>
                    <Badge variant="outline">
                      {new Date(event.date).toLocaleDateString()}
                    </Badge>
                  </div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="mt-1">{event.description}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(event)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openDeleteDialog(event)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>
                    {event.attendees}
                    {event.maxAttendees && `/${event.maxAttendees}`} asistentes
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>📍 {event.location}</p>
              </div>

              {/* Poll Section */}
              {event.poll ? (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <p className="font-medium text-blue-900">Encuesta en Vivo</p>
                  </div>
                  <p className="text-sm text-blue-900 mb-3">{event.poll.question}</p>
                  <div className="space-y-2">
                    {event.poll.options.map((option) => {
                      const percentage = event.poll!.totalVotes > 0
                        ? (option.votes / event.poll!.totalVotes) * 100
                        : 0;
                      return (
                        <div key={option.id} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-blue-900">{option.text}</span>
                            <span className="font-medium text-blue-900">
                              {option.votes} ({Math.round(percentage)}%)
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-blue-700 mt-3">
                    Total de votos: {event.poll.totalVotes}
                  </p>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => openPollDialog(event)}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Agregar Encuesta
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600 text-center">
              No hay eventos programados. Crea tu primer evento.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Add Event Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Evento</DialogTitle>
            <DialogDescription>Ingresa la información del evento</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Hora *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo *</Label>
                <RadioGroup value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Asamblea" id="asamblea" />
                    <Label htmlFor="asamblea">Asamblea</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Social" id="social" />
                    <Label htmlFor="social">Social</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Mantenimiento" id="mantenimiento" />
                    <Label htmlFor="mantenimiento">Mantenimiento</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Capacidad Máxima</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={formData.maxAttendees}
                  onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                  placeholder="Opcional"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdd}>Crear Evento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Evento</DialogTitle>
            <DialogDescription>Modifica la información del evento</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Título *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Descripción</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date">Fecha *</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-time">Hora *</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">Ubicación *</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-maxAttendees">Capacidad Máxima</Label>
              <Input
                id="edit-maxAttendees"
                type="number"
                value={formData.maxAttendees}
                onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Poll Dialog */}
      <Dialog open={isPollDialogOpen} onOpenChange={setIsPollDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Agregar Encuesta al Evento</DialogTitle>
            <DialogDescription>Crea una encuesta en vivo para el evento</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="poll-question">Pregunta *</Label>
              <Input
                id="poll-question"
                value={pollData.question}
                onChange={(e) => setPollData({ ...pollData, question: e.target.value })}
                placeholder="¿Cuál es tu pregunta?"
              />
            </div>
            <div className="space-y-2">
              <Label>Opciones *</Label>
              {pollData.options.map((option, index) => (
                <Input
                  key={index}
                  value={option}
                  onChange={(e) => updatePollOption(index, e.target.value)}
                  placeholder={`Opción ${index + 1}`}
                />
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPollData({ ...pollData, options: [...pollData.options, ""] })}
              >
                + Agregar Opción
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPollDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddPoll}>Crear Encuesta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El evento será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
