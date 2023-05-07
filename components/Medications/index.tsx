import MedicationCreate from "./MedicationCreate";
import MedicationEdit from "./MedicationEdit";
import MedicationList from "./MedicationList";
import MedicationShow from "./MedicationShow";

const medicationResource = {
  list: MedicationList,
  create: MedicationCreate,
  edit: MedicationEdit,
  show: MedicationShow,
};
export default medicationResource;
