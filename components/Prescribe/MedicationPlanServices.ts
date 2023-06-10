import { MedicationPlan, MedicationPlanForm } from "../utils/commons";
import api from "../../services/index";
const createMedicationPlan = async (medicationPlanForm: MedicationPlanForm) => {
  try {
    const { config, data, headers, status, statusText, request } =
      await api.post<MedicationPlan>("/medication-plans", medicationPlanForm);
    // console.log({ config, data, headers, status, statusText, request });
    return data;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return null;
  }
};

const MedicationPlanServices = {
  createMedicationPlan,
};

export default MedicationPlanServices;
