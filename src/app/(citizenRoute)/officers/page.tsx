"use client"

import { Container } from "@/components/Container";
import Loading from "@/components/loader";
import { PoliceTable } from "@/components/PoliceTable";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Officers() {
    
    const [officers, setOfficers] = useState([])
    const [loading, setLoading] = useState(true)
    const params = useSearchParams()

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await axios.get(`/api/v1/users/police/${params.get("area")}/${params.get("location")}`)
                setOfficers(data.officers)
                console.log(data.officers)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        !loading ?
        <Container className="flex flex-col items-center justify-start gap-4">
            <div className="w-[80%] py-10">
                <PoliceTable officers={officers} />
                {officers.length == 0 && 
                    <h1 className="text-center w-full font-medium text-xl mt-10">No officers to show!</h1>
                }
            </div>
        </Container>
        : <Loading />
    )
}