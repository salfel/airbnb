import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import React, { FormEvent, ReactNode, useEffect, useState } from "react";
import { Apartment, Attribute, PageProps, Review as ReviewType } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { LuBath, LuBed, LuStar } from "react-icons/lu";
import UserAvatar from "@/components/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Review from "@/components/Review";
import AverageStars from "@/components/AverageStars";
import { attributes as _attributes } from "@/lib/constants";

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
                <div className="flex items-center gap-4 mb-12">
                    <AverageStars stars={apartment.stars} />

                    <span className="font-semibold text-xl">
                        {apartment.stars}
                    </span>
                    <span className="text-gray-500">
                        (Based on {apartment.reviews_count} reviews)
                    </span>
                </div>

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
                    <Button asChild variant="link" className="mt-6">
                        <Link
                            href={route("apartments.show", {
                                apartment: apartment.id,
                                _query: {
                                    page:
                                        parseInt(
                                            new URLSearchParams(
                                                location.search,
                                            ).get("page") ?? "1",
                                        ) + 1,
                                },
                            })}
                            preserveScroll
                            only={["reviews"]}
                        >
                            View more
                        </Link>
                    </Button>
                )}
            </section>
        </>
    );
}

interface ReviewFormProps {
    apartment: Apartment;
}

function ReviewForm({ apartment }: ReviewFormProps) {
    const [isDown, setIsDown] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        document.addEventListener("mousedown", () => setIsDown(true));
        document.addEventListener("mouseup", () => setIsDown(false));

        return () => {
            document.removeEventListener("mousedown", () => setIsDown(true));
            document.removeEventListener("mouseup", () => setIsDown(false));
        };
    }, []);

    const { data, setData, errors, clearErrors, post, processing, reset } =
        useForm({
            stars: 1,
            message: "",
        });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        post(route("apartments.reviews.store", [apartment.id]), {
            preserveScroll: true,
            onSuccess: () => {
                reset("stars", "message");
            },
            onError: ({ auth }) => {
                if (!auth) return;

                reset("stars", "message");
                toast({
                    variant: "destructive",
                    title: "Not authorized!",
                    description: auth,
                    action: (
                        <ToastAction altText="Login">
                            <Link href={route("login")}>Login</Link>
                        </ToastAction>
                    ),
                });
            },
        });
    }

    return (
        <form className="mt-6" onSubmit={handleSubmit}>
            <Card className="space-y-2">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Write a Review</CardTitle>
                    </div>
                    <CardDescription>
                        Share your experience about this apartment. Your review
                        will help others make informed decisions.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid items-center gap-1">
                        <Label>Rating</Label>
                        <div>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <LuStar
                                    fill={
                                        data.stars >= index + 1
                                            ? "black"
                                            : "none"
                                    }
                                    className="inline-block w-4 h-4"
                                    onMouseOver={() =>
                                        isDown && setData("stars", index + 1)
                                    }
                                    onMouseDown={() =>
                                        setData("stars", index + 1)
                                    }
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="grid w-full gap-1">
                        <Label htmlFor="message">Comment</Label>
                        <Textarea
                            id="message"
                            placeholder="Write your review here..."
                            rows={3}
                            value={data.message}
                            onChange={(e) => {
                                setData("message", e.target.value);
                                clearErrors("message");
                            }}
                        />
                        {errors.message ? (
                            <p className="text-[0.8rem] font-medium text-red-500">
                                {errors.message}
                            </p>
                        ) : (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Your review will be public. Please avoid sharing
                                sensitive information.
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled={processing} type="submit">
                        Post Review
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

interface AttributesCardProps {
    attributes: string[];
}

function AttributesCard({ attributes }: AttributesCardProps) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">
                This Apartment offers you:{" "}
            </h2>
            <div>
                <div className="inline-grid grid-cols-2 gap-y-6 gap-x-12">
                    {attributes
                        .map(
                            (attribute) =>
                                _attributes.find(
                                    (value) => value.name === attribute,
                                ) as Attribute,
                        )
                        .filter((attribute) => attribute)
                        .sort((a, b): number => {
                            const getIndex = (c: Attribute) =>
                                _attributes.findIndex(
                                    (attribute) => attribute.name === c.name,
                                );

                            return getIndex(a) - getIndex(b);
                        })
                        .map((attribute, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-6"
                                >
                                    <attribute.icon className="w-6 h-6" />
                                    <p className="text-lg">{attribute.name}</p>
                                </div>
                            );
                        })
                        .filter((_, index) => collapsed || index < 6)}
                </div>
            </div>

            <Button
                variant="outline"
                onClick={() =>
                    collapsed ? setCollapsed(false) : setCollapsed(true)
                }
            >
                View {collapsed ? "less" : "more"}
            </Button>
        </div>
    );
}

Show.layout = (page: ReactNode) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
