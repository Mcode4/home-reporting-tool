// :id - Creator/Editor page component with AssetsMenu
import CreatorsPage from "@/components/CreatorsPage";

export default function PropertyPage({ params }) {
    const { id } = params;

    return (
        <div id="propertyPage">
            <CreatorsPage propertyId={id} />
            <AssetsMenu propertyId={id} />
        </div>

    )
}