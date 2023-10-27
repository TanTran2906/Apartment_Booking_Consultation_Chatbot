import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function UserTableOperations() {
    return (
        <TableOperations>
            {/* We could do these two as compound components as well, but let's keep it simple, and let's also explore different ways of achieving the same thing */}
            <Filter
                filterField="active"
                options={[
                    { value: "all", label: "All" },
                    { value: "no-active", label: "No active" },
                    { value: "with-active", label: "With active" },
                ]}
            />

            <SortBy
                options={[
                    { value: "fullName-asc", label: "Sort by name (A-Z)" },
                    { value: "fullName-desc", label: "Sort by name (Z-A)" },
                ]}
            />
        </TableOperations>
    );
}

export default UserTableOperations;
