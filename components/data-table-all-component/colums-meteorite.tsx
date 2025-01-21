"use client"

import { ColumnDef } from "@tanstack/react-table"
import {meteorite} from "@/lib/interfaces/meteorite-interface";

export const columns: ColumnDef<meteorite>[] = [
    {
        accessorKey: "name",
        header: "Nom",
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nametype",
        header: "Type nom",
    },
    {
        accessorKey: "recclass",
        header: "La classe",
    },
    {
        accessorKey: "mass_g",
        header: "Masse",
    },
    {
        accessorKey: "fall",
        header: "Chutte",
    },
    {
        accessorKey: "year",
        header: "Année",
    },
    {
        accessorKey: "latitude",
        header: "latitude",
    },
    {
        accessorKey: "longitude",
        header: "longitude",
    },
]
