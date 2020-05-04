import { EntityRepository, Repository, Entity } from 'typeorm';

import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findApppointment = await this.findOne({
      where: { date },
    });
    return findApppointment || null;
  }
}
export default AppointmentRepository;
