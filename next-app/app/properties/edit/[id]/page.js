// :id - Edit House Property Page Component
import AddHousePage from "@/components/AddHousePage";

export default function EditPropertyPage({ params }) {
    const { id } = params;

    return (
        <AddHousePage propertyId={id} />
    )
}