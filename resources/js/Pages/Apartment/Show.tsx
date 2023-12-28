import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { Apartment, PageProps } from "@/types";
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
import { Bath, Bed, Star, StarHalf } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

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
            <section className="mt-12">
                <div className="flex items-center gap-4 mb-12">
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) =>
                            apartment.stars >= index + 1 ? (
                                <Star
                                    key={index}
                                    fill="black"
                                    className="w-8 h-8"
                                />
                            ) : apartment.stars >= index + 0.5 ? (
                                <div className="relative" key={index}>
                                    <StarHalf
                                        fill="black"
                                        className="absolute w-8 h-8"
                                    />
                                    <Star
                                        className="w-8 h-8"
                                        strokeWidth={1.5}
                                    />
                                </div>
                            ) : (
                                <Star
                                    key={index}
                                    className="w-8 h-8"
                                    strokeWidth={1.5}
                                />
                            ),
                        )}
                    </div>
                    <span className="font-semibold text-xl">
                        {apartment.stars}
                    </span>
                    <span className="text-gray-500">
                        (Based on {apartment.reviews_count} reviews)
                    </span>
                </div>

                <ReviewForm apartment={apartment} />
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
                                <Star
                                    fill={
                                        data.stars >= index + 1
                                            ? "black"
                                            : "none"
                                    }
                                    className="inline-block w-4 h-4"
                                    onMouseOver={() =>
                                        isDown && setData("stars", index + 1)
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

Show.layout = (page: ReactNode) => (
    <AuthenticatedLayout>{page}</AuthenticatedLayout>
);
