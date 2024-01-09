import Layout from "@/layouts/Layout";
import React, { ReactNode } from "react";
import {
	Apartment,
	Host,
	Mark,
	PageProps,
	Review as ReviewType
} from "@/types";
import { Head, Link } from "@inertiajs/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Bath, Bed, Grid2X2, Star, Users } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import Review from "@/Pages/Apartment/Show/Review";
import ReviewForm from "./Show/ReviewForm";
import AttributesCard from "./Show/AttributesCard";
import Rating from "@/Pages/Apartment/Show/Rating";
import MoreReviewsButton from "@/Pages/Apartment/Show/MoreReviewsButton";
import RentForm from "./Show/RentForm";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Show({
	apartment,
	reviews,
	mark,
	stars
}: PageProps & {
	apartment: Apartment;
	reviews: ReviewType[];
	mark: Mark | null;
	stars: number;
}) {
	return (
		<>
			<Head title={apartment.title} />

			<ImageCarousel apartment={apartment} />

			<div className="relative mt-12 space-y-6">
				<div>
					<h1 className="text-2xl font-semibold">
						{apartment.title}
					</h1>
					<p className="mt-2 text-sm text-gray-800">
						{apartment.description}
					</p>

					<Button
						variant="secondary"
						asChild
						className="group absolute right-3 top-3"
					>
						<Link
							href={
								mark?.id ?
									route("marks.destroy", [mark.id])
								:	route("apartments.marks.store", [apartment.id])
							}
							method={mark?.id ? "delete" : "post"}
							as="button"
						>
							Mark
							<Star
								className={cn(
									"ml-2 h-4 w-4 group-hover:stroke-yellow-500",
									mark?.id &&
										"fill-yellow-500 stroke-yellow-500"
								)}
							/>
						</Link>
					</Button>
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
				<Rating stars={stars} reviews_count={apartment.reviews_count} />

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
					labels
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
					<TableRow>
						<TableCell className="flex items-center gap-3">
							<Grid2X2 className="h-5 w-10" />
							<span className="font-medium">Square Meters</span>
						</TableCell>
						<TableCell>{apartment.square_meters}</TableCell>
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
