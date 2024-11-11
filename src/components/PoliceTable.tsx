import { Prisma } from "@prisma/client";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { convertIsoToReadableDate } from "@/utils/dateConverter";

export const PoliceTable = ({
  officers,
}: {
  officers: Array<Prisma.PoliceOfficerGetPayload<{include: { user: true }}>>;
}) => {
  return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Badge</TableHead>
            <TableHead>Joining Date</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Departments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {officers.map((officer, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {officer.user.fullName}
              </TableCell>
              <TableCell>{officer.badgeNumber}</TableCell>
              <TableCell>
                {convertIsoToReadableDate(officer.joiningDate.toString())}
              </TableCell>
              <TableCell>{officer.rank}</TableCell>
              <TableCell>
                {officer.department.map((dept) => `${dept}, `)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
};
