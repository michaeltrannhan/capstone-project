import api from '.';
import { Medication } from '../components/utils/commons';
// import { getAuthorizationHeader } from ".";
const fetchMedicationByKeyword = async (keyword: string) => {
  const { data } = await api.get<{ data: Medication[]; meta: any }>(
    `medications?page=1&perPage=50&field=createdAt&order=asc&keyword=${keyword}`
  );
  return data.data;
};

const MedicationService = {
  fetchMedicationByKeyword,
};

export default MedicationService;
