import { asyncHandler } from "@/helpers/asyncHandler";
import prisma from "@/prisma";
import { NextResponse, type NextRequest } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {

    const body: any = await req.json()
    const { userId, incidentTime, victim, phoneNumber, fullName, address, description, offence, assignedStationId, suspects } = body
    const fir = await prisma.eFIR.create({
        data: {
            user: {
                connect: {
                    id: userId
                }
            },
            incidentTime,
            victim,
            description,
            address: {
                create: address
            },
            offence,
            assignedStation: {
                connect: {
                    id: assignedStationId
                }
            },
            suspects: {
                create: suspects
            }
        }
    })

    return NextResponse.json({ "message": "Done", fir }, { status: 201 })

})