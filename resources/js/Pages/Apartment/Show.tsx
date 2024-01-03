import Layout from "@/layouts/Layout";
import React, { ReactNode } from "react";
import { Apartment, Host, PageProps, Review as ReviewType } from "@/types";
import { Head, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Bath, Bed, Users } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import Review from "@/Pages/Apartment/Show/Review";
import ReviewForm from "./Show/ReviewForm";
import AttributesCard from "./Show/AttributesCard";
import Rating from "@/Pages/Apartment/Show/Rating";
import MoreReviewsButton from "@/Pages/Apartment/Show/MoreReviewsButton";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/components/ui/carousel";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "@/components/ui/form";
import { Control, useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { useErrors } from "@/lib/hooks";
import FormInput from "@/components/FormInput";

export default function Show({
	apartment,
	reviews
}: PageProps & {
	apartment: Apartment;
	reviews: ReviewType[];
}) {
	return (
		<>
			<Head title={apartment.title} />

			<ImageCarousel apartment={apartment} />

			<div className="mt-12 space-y-6">
				<div>
					<h1 className="text-2xl font-semibold">
						{apartment.title}
					</h1>
					<p className="mt-2 text-sm text-gray-800">
						{apartment.description}
					</p>
				</div>

				<p className="text-2xl font-semibold">
					{apartment.price}€
					<span className="text-base font-normal"> per Night</span>
				</p>

				<AccommodationDetails apartment={apartment} />

				<HostInfo host={apartment.host} />

				<AttributesCard attributes={apartment.attributes} />

				<RentForm apartment={apartment} />
			</div>
			<section className="mt-12 space-y-8">
				<Rating
					stars={apartment.stars}
					reviews_count={apartment.reviews_count}
				/>

				<CreateReview apartmentId={apartment.id} />

				<Reviews reviews={reviews} apartment={apartment} />
			</section>
		</>
	);
}

Show.layout = (page: ReactNode) => <Layout>{page}</Layout>;

function ImageCarousel({ apartment }: { apartment: Apartment }) {
	return (
		<section>
			<Carousel opts={{ loop: true }}>
				<CarouselContent>
					{apartment.images.map((image, index) => (
						<CarouselItem key={index}>
							<img
								src={image || "/placeholder.svg"}
								alt="placeholder"
								className="aspect-video w-full basis-1"
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className="absolute bottom-10 flex w-full items-center justify-center gap-12">
					<CarouselPrevious className="static" />
					<CarouselNext className="static" />
				</div>
			</Carousel>
		</section>
	);
}

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

function HostInfo({ host }: { host: Host }) {
	return (
		<Card className="w-80 p-3">
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

function AccommodationDetails({ apartment }: { apartment: Apartment }) {
	return (
		<Card className="w-80">
			<Table>
				<TableBody>
					<TableRow>
						<TableCell className="flex items-center gap-3">
							<Users className="h-5 w-10" />
							<span className="font-medium">Guests</span>
						</TableCell>
						<TableCell>{apartment.guests}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="flex items-center gap-3">
							<Bed className="h-5 w-10" />
							<span className="font-medium">Bedrooms</span>
						</TableCell>
						<TableCell>{apartment.beds}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="flex items-center gap-3">
							<Bath className="h-5 w-10" />
							<span className="font-medium">Bathrooms</span>
						</TableCell>
						<TableCell>{apartment.baths}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Card>
	);
}

function Reviews({
	apartment,
	reviews
}: {
	reviews: ReviewType[];
	apartment: Apartment;
}) {
	return (
		<>
			{reviews.length > 0 && (
				<div>
					<h3 className="mb-3 text-lg font-semibold">
						Most recent Reviews
					</h3>

					<div className="grid grid-cols-2 gap-12 lg:grid-cols-3">
						{reviews.map((review) => (
							<Review review={review} key={review.id} />
						))}
					</div>
				</div>
			)}

			{reviews.length !== apartment.reviews_count && (
				<MoreReviewsButton apartmentId={apartment.id} />
			)}
		</>
	);
}

interface RentFormValues {
	date: DateRange;
	guests: number;
	description: string;
}

interface RentFormProps {
	apartment: Apartment;
}

function RentForm({ apartment }: RentFormProps) {
	const errors = useErrors();

	const form = useForm<RentFormValues>({
		defaultValues: {
			date: {
				from: new Date(apartment.start),
				to: new Date(apartment.end)
			},
			guests: 1,
			description: ""
		}
	});

	function handleSubmit(values: { date: DateRange }) {
		const data = {
			start: values.date.from?.toISOString(),
			end: values.date.to?.toISOString(),
			...values
		};

		router.post(route("apartments.rents.store", [apartment.id]), data, {
			preserveScroll: true,
			onSuccess: () => form.reset()
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Rent this Apartment</CardTitle>
				<CardDescription>
					Looking for a vacation getaway? Fill out the details below
					to book this apartment for your holiday. We&apos;re excited
					to be a part of your vacation experience!
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex gap-12"
					>
						<CalendarInput
							control={form.control}
							error={errors.start || errors.end}
						/>

						<div className="flex-1 space-y-4">
							<FormInput
								name="guests"
								type="number"
								control={form.control}
								error={errors.guests}
								description="How many people will be staying?"
							/>

							<FormInput
								name="description"
								control={form.control}
								error={errors.description}
								description="Please tell us why you're here and what you will be doing during your stay"
								textarea
							/>

							<Button type="submit">Rent</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

function CalendarInput({
	control,
	error
}: {
	control: Control<RentFormValues>;
	error?: string;
}) {
	return (
		<FormField
			name="date"
			control={control}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<Calendar
							mode="range"
							selected={field.value}
							onSelect={field.onChange}
						/>
					</FormControl>
					<FormMessage>{error}</FormMessage>
				</FormItem>
			)}
		/>
	);
}
