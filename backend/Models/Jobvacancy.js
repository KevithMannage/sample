import mongoose from 'mongoose';

const jobvacancySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    related_area: { type: String, required: true  },
    jobPosition: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
  });
  

const jobvacancy= mongoose.model('jobvacancy', jobvacancySchema);
export default jobvacancy;