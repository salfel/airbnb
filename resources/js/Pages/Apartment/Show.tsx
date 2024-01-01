import Layout from "@/layouts/Layout";
import React, { ReactNode, useState } from "react";
import { Apartment, Host, PageProps, Review as ReviewType } from "@/types";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { LuBath, LuBed } from "react-icons/lu";
import UserAvatar from "@/components/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import Review from "@/Pages/Apartment/Show/Review";
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

                    <RoomsCard apartment={apartment} />

                    <UserCard host={apartment.host} />

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
            <section className="mt-12 space-y-8">
                <CreateReview apartmentId={apartment.id} />

                {reviews.length > 0 && (
                    <div>
                        <h3 className="mb-3 font-semibold text-lg">
                            Most recent Reviews
                        </h3>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
                            {reviews.map((review) => (
                                <Review review={review} key={review.id} />
                            ))}
                        </div>
                    </div>
                )}

                {reviews.length !== apartment.reviews_count && (
                    <MoreReviewsButton apartmentId={apartment.id} />
                )}
            </section>
        </>
    );
}

Show.layout = (page: ReactNode) => <Layout>{page}</Layout>;

function CreateReview({ apartmentId }: { apartmentId: number }) {
    return (
        <Card className="space-y-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Write a Review</CardTitle>
                </div>
                <CardDescription>
                    Share your experience about this apartment. Your review will
                    help others make informed decisions.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <ReviewForm
                    url={route("apartments.reviews.store", [apartmentId])}
                    method="post"
                    buttonText="Create Review"
                />
            </CardContent>
        </Card>
    );
}

function UserCard({ host }: { host: Host }) {
    return (
        <Card className="p-3">
            <div className="flex items-center gap-3">
                <UserAvatar user={host.user} />
                <div>
                    <div>
                        <span>Your host is: </span>
                        <span className="font-semibold tracking-tight">
                            {host.user.name}
                        </span>
                    </div>

                    <p>Host since {formatDistanceToNow(host.created_at)}</p>
                </div>
            </div>
        </Card>
    );
}

function RoomsCard({ apartment }: { apartment: Apartment }) {
    return (
        <Card>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="flex items-center gap-3">
                            <LuBed className="w-10" />
                            <span className="font-medium">Bedrooms</span>
                        </TableCell>
                        <TableCell>{apartment.beds}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="flex items-center gap-3">
                            <LuBath className="w-10" />
                            <span className="font-medium">Bathrooms</span>
                        </TableCell>
                        <TableCell>{apartment.baths}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
}
