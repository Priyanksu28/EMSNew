import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "sno",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Employee Id",
        selector: (row) => row.employeeId,
        width: "120px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "140px"
    },
    {
        name: "Issue Type",
        selector: (row) => row.issueType,
        width: "140px"
    },
    {
        name: "Department",
        selector: (row) => row.department_name,
        width: "170px"
    },
    {
        name: "Applied Date",
        selector: (row) => row.appliedDate,
        width: "120px",
        sortable: true
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: "120px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true
    },
];

export const IssueButton = ({ Id }) => {
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/admin-dashboard/issues/${id}`);
    };
    console.log(handleView);
    

    return (
        <button
            className="px-2 py-1 bg-teal-500 text-white hover:bg-teal-600"
            onClick={() => handleView(Id)}
        >
            View
        </button>
    );
};
