import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { ReactNode, useState } from "react";
import { Apartment, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Bath, Bed } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { formatDistanceToNow } from "date-fns";

export default function Show({
    apartment,
}: PageProps & { apartment: Apartment }) {
    const [image, setImage] = useState(apartment.images[0]);

    return (
        <>
            <Head title={apartment.title} />

            <section className="grid grid-cols-3 gap-x-12">
                <img
                    src={image || "/placeholder.svg"}
                    alt={apartment.title}
                    className="col-span-2 aspect-video object-cover"
                />

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-medium">
                            {apartment.title}
                        </h1>
                        <p className="mt-2 text-gray-800 text-sm">
                            {apartment.description}
                        </p>
                    </div>

                    <p className="text-2xl font-semibold">
                        {apartment.price}€
                        <span className="text-base font-normal">
                            {" "}
                            per Night
                        </span>
                    </p>

                    <Card>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="flex items-center gap-3">
                                        <Bed className="w-10" />
                                        <span className="font-medium">
                                            Bedrooms
                                        </span>
                                    </TableCell>
                                    <TableCell>{apartment.beds}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="flex items-center gap-3">
                                        <Bath className="w-10" />
                                        <span className="font-medium">
                                            Bathrooms
                                        </span>
                                    </TableCell>
                                    <TableCell>{apartment.baths}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>

                    <Card className="p-3">
                        <div className="flex items-center gap-3">
                            <UserAvatar user={apartment.host.user} />
                            <div>
                                <CardTitle>
                                    {apartment.host.user.name}
                                </CardTitle>

                                <p>
                                    Host since{" "}
                                    {formatDistanceToNow(
                                        apartment.host.created_at,
                                    )}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Button className="w-full">Start Renting</Button>
                </div>

                <div className="flex gap-6 mt-6">
                    {apartment.images.map((image, index) => (
                        <button onClick={() => setImage(image)} key={index}>
                            <img
                                src={image || "/placeholder.svg"}
                                alt="placeholder"
                                className="h-20 aspect-video"
                            />
                        </button>
                    ))}
                </div>
            </section>
        </>
    );
}

Show.layout = (page: ReactNode) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
