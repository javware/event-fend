import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { useEffect, useState } from 'react';
import { LuCalendarSearch } from 'react-icons/lu'
import { useQuery } from '@tanstack/react-query'
import { getEvent } from '../api/EventAPI'
import { EventInput } from '@fullcalendar/core';
import { parseISO } from 'date-fns'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function Calendar() {
    const [selectedEvent, setSelectedEvent] = useState<EventInput>();
    const [events, setEvents] = useState<EventInput[]>([]);

    const { data, error, isLoading } = useQuery({
        queryKey: ['event'],
        queryFn: getEvent,
    });

    useEffect(() => {
        if (data) {
            const transformedEvents = data.map(event => ({
                id: event.id,
                title: event.nombre_evento,
                start: event.fecha_inicio.replace(" ", "T"),
                end: event.fecha_fin.replace(" ", "T"),
                color: event.tipo_evento === "GRATIS" ? '#11D18F' : '#F36D23',
                extendedProps: {
                    organizador: `${event.nombre_organizador} ${event.apellido_organizador}`,
                    direccion: event.descripcion_dire,
                    categoria: event.nombre_cate_evento,
                    tipo_evento: event.tipo_evento,
                    fecha_inicio: event.fecha_inicio,
                    fecha_fin: event.fecha_fin,
                    costo: event.costo,
                }
            }));

            setEvents(transformedEvents);
        }
    }, [data]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading events</p>;

    const handleEventClick = (clickInfo: any) => {
        setSelectedEvent(clickInfo.event);
    };

    const formatEventDate = (dateString: string) => {
        const date = parseISO(dateString.replace(" ", "T"))
        return format(date, "d 'de' MMMM yyyy - h:mm a", { locale: es })
    }

    return (
        <div className="flex flex-col gap-4 md:flex-row p-4 border border-gray-100 rounded-xl bg-white w-full">
            {/* Calendario en la parte izquierda */}
            <div className="md:w-3/4 w-full">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale={esLocale}
                    events={events}
                    eventClick={handleEventClick}
                    headerToolbar={{
                        start: 'prev,next today',
                        center: 'title',
                        end: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    height="21.8rem"
                    dayMaxEventRows={3}
                />
            </div>

            {/* Detalles del evento en la parte derecha */}
            <div className="md:w-1/4 w-full p-5 bg-sky-50 rounded-e-xl ">
                {selectedEvent ? (
                    <>
                        <div className='space-y-1 pb-1'>
                            <h1 className="text-base font-semibold text-green-500">Detalles del Evento</h1>
                            <h2 className="text-xl font-bold text-primary">{selectedEvent.title}</h2>
                        </div>

                        <div className='mb-2'>
                            <p className="text-xs font-medium text-gray-500">Ubicación:</p>
                            <p className='text-sm text-gray-600'> {selectedEvent.extendedProps?.direccion}</p>
                        </div>
                        <div className='mb-2'>
                            <p className="text-xs font-medium text-gray-500">Organizador:</p>
                            <p className='text-sm text-gray-600'> {selectedEvent.extendedProps?.organizador}</p>
                        </div>
                        <div className='mb-2'>
                            <p className="text-xs font-medium text-gray-500">Costo:</p>
                            <p className='text-sm font-semibold  text-gray-600'> S/{selectedEvent.extendedProps?.costo}</p>
                        </div>
                        <hr className='border-gray-300 my-2' />

                        <div className='space-y-2 pb-2'>
                            <h1 className="text-base font-semibold text-green-500">Horario del Evento</h1>
                        </div>
                        <div className='space-y-3'>
                            <div className='rounded-lg bg-white p-3' >
                                <p className="text-xs font-medium text-primary">{selectedEvent.extendedProps?.tipo_evento}:</p>
                                <p className='text-sm text-gray-600'> {selectedEvent.extendedProps?.duration}</p>
                                <p className="text-xs font-medium text-gray-500">{formatEventDate(selectedEvent.extendedProps?.fecha_inicio)}</p>
                                <p className="text-xs font-medium text-gray-500">{formatEventDate(selectedEvent.extendedProps?.fecha_fin)}</p>
                            </div>

                        </div>

                    </>


                ) : (
                    <div className="flex flex-col items-center text-slate-500">
                        <p className="font-semibold text-center leading-tight">Selecciona un evento para ver los detalles.</p>
                        <LuCalendarSearch strokeWidth={1.5} className=' w-36 h-48' />
                    </div>
                )}
            </div>
        </div>
    );
}