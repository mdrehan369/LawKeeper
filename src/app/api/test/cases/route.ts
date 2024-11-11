import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        // console.log(body)
        const { caseId, caseType, officers } = body
        const assignedCase = await prisma.caseAssignment.create({
            include: {
                officer: true
            },
            data: {
                caseId,
                caseType,
                officer: {
                    create: officers
                }
            }
        })

        return NextResponse.json({ "message": "Done", "case": assignedCase }, {status:201})
    } catch (err) {
        console.log(err)
        return NextResponse.json({}, {status: 500})
    }
}