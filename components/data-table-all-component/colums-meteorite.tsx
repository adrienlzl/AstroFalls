"use client"
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table"
import { emptyValuePipe } from "@/lib/utils/empty-value-pipe";
import { Meteorite } from "@/lib/interfaces/meteorite-interface";
import { transformStringValuePipe } from "@/lib/utils/transform-string-value-pipe";


const transformationMap = {
  "find": <div className="find-or-not">
						<Image src="/images/valid.png"
									alt="Météorite découverte"
									width={22}
									height={22} />
					</div>,
  "fall": <div className="find-or-not">
						<Image src="/images/invalid.png"
									alt="Météorite non découverte"
									width={22}
									height={22} />
					</div>
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
    cell: ({ row }) => emptyValuePipe(row.getValue("Year")),
		enableResizing: false,
		size: 25
	},
	{
		accessorKey: "wg",
		header: "Masse",
    cell: ({ row }) => emptyValuePipe(row.getValue("wg")),
		enableResizing: false,
		size: 20
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
		cell: ({ row }) => transformStringValuePipe(row.getValue("ff"), transformationMap),
		enableResizing: false,
		size: 20
	},
	{
		accessorKey: "Class",
		header: "Classe",
    cell: ({ row }) => emptyValuePipe(row.getValue("Class"))
	},
	{
		accessorKey: "Group",
		header: "Groupe",
    cell: ({ row }) => emptyValuePipe(row.getValue("Group")),
		enableResizing: false,
		size: 20
	}
]
