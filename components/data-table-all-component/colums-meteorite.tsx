"use client"
import { ColumnDef } from "@tanstack/react-table"
import { emptyValuePipe } from "@/lib/utils/empty-value-pipe";
import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import { transformStringValuePipe } from "@/lib/utils/transform-string-value-pipe";


const transformationMap = {
  "find": "Oui",
  "fall": "Non"
};

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
		cell: ({ row }) => transformStringValuePipe(row.getValue("ff"), transformationMap)
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
