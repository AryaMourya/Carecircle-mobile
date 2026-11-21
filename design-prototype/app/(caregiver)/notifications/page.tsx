import { SimpleList } from "@/components/caregiver/SimpleList";

export default function Page() {
  return <SimpleList title="Alerts" items={[{ title: "Metformin marked as taken", sub: "8:04 am" }]} />;
}
