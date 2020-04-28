import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepo: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepo = appointmentsRepository;
  }

  execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepo.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This Appointment is already booked');
    }

    const appointment = this.appointmentsRepo.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
