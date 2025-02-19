"use client"
import { ColumnDef } from "@tanstack/react-table"
import { emptyValuePipe } from "@/lib/utils/empty-value-pipe";
import { Meteorite } from "@/lib/interfaces/meteorite-interface";

export const columns: ColumnDef<Meteorite>[] = [
	{
		accessorKey: "Name",
		header: "Nom",
    cell: ({ row }) => emptyValuePipe(row.getValue("Name"))
	},
	{
		accessorKey: "Year",
		header: "Année",
    cell: ({ row }) => emptyValuePipe(row.getValue("Year"))
	},
	{
		accessorKey: "wg",
		header: "Masse",
    cell: ({ row }) => emptyValuePipe(row.getValue("wg"))
	},
	{
		accessorKey: "Country",
		header: "Pays",
    cell: ({ row }) => emptyValuePipe(row.getValue("Country"))
	},
	{
		accessorKey: "Locality",
		header: "Lieu",
    cell: ({ row }) => emptyValuePipe(row.getValue("Locality"))
	},
	{
		accessorKey: "ff",
		header: "Découverte",
		cell: ({ row }) => {
			const value = row.getValue("ff") as string | undefined;
			if (!value) return "NC";

			const lowerCaseValue = value.toLowerCase();
			if (lowerCaseValue === "find") return "Oui";
			if (lowerCaseValue === "fall") return "Non";
			return "NC";
		}
	},
	{
		accessorKey: "Class",
		header: "Classe",
    cell: ({ row }) => emptyValuePipe(row.getValue("Class"))
	},
	{
		accessorKey: "Group",
		header: "Groupe",
    cell: ({ row }) => emptyValuePipe(row.getValue("Group"))
	}
]
