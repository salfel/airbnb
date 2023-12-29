import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import React, { ReactNode, useState } from "react";
import { Apartment, PageProps, Review as ReviewType } from "@/types";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { LuBath, LuBed } from "react-icons/lu";
import UserAvatar from "@/components/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import Review from "@/components/Review";
import ReviewForm from "./Show/ReviewForm";
import AttributesCard from "./Show/AttributesCard";
import Rating from "@/Pages/Apartment/Show/Rating";
import MoreReviewsButton from "@/Pages/Apartment/Show/MoreReviewsButton";

export default function Show({
    apartment,
    reviews,
}: PageProps & {
    apartment: Apartment;
    reviews: ReviewType[];
}) {
    const [image, setImage] = useState(apartment.images[0]);

    return (
        <>
            <Head title={apartment.title} />

            <section className="grid grid-cols-3 gap-x-12">
                <div className="col-span-2">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={apartment.title}
                        className="aspect-video object-cover"
                    />

                    <div className="flex flex-wrap gap-6 mt-6">
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
                </div>

                <div className="flex flex-col justify-between space-y-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
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
                                        <LuBed className="w-10" />
                                        <span className="font-medium">
                                            Bedrooms
                                        </span>
                                    </TableCell>
                                    <TableCell>{apartment.beds}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="flex items-center gap-3">
                                        <LuBath className="w-10" />
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
                                <div>
                                    <span>Your host is: </span>
                                    <span className="font-semibold tracking-tight">
                                        {apartment.host.user.name}
                                    </span>
                                </div>

                                <p>
                                    Host since{" "}
                                    {formatDistanceToNow(
                                        apartment.host.created_at,
                                    )}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Button className="w-full" size="lg">
                        Start Renting
                    </Button>
                </div>
            </section>
            <section className="mt-12">
                <Rating
                    stars={apartment.stars}
                    reviews_count={apartment.reviews_count}
                />

                <AttributesCard attributes={apartment.attributes} />
            </section>
            <section className="mt-12">
                <ReviewForm apartment={apartment} />

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 mt-8">
                    {reviews.map((review) => (
                        <Review review={review} key={review.id} />
                    ))}
                </div>

                {reviews.length !== apartment.reviews_count && (
                    <MoreReviewsButton apartmentId={apartment.id} />
                )}
            </section>
        </>
    );
}

Show.layout = (page: ReactNode) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
