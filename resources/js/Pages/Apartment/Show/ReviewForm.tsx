import { Apartment } from "@/types";
import React, { FormEvent, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Link, useForm } from "@inertiajs/react";
import { ToastAction } from "@/components/ui/toast";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LuStar } from "react-icons/lu";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ReviewFormProps {
    apartment: Apartment;
}

export default function ReviewForm({ apartment }: ReviewFormProps) {
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