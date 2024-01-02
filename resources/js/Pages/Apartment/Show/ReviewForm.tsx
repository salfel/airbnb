import { Review as ReviewType } from "@/types";
import { useForm } from "react-hook-form";
import { useErrors } from "@/lib/hooks";
import { router } from "@inertiajs/react";
import { Method } from "@inertiajs/core";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import RatingInput from "@/Pages/Apartment/Show/RatingInput";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";

type ReviewFormValues = {
	stars: number;
	message: string;
};

interface ReviewFormProps {
	review?: ReviewType;
	url: string;
	buttonText: string;
	method?: Method;
	onSuccess?: () => void;
}

export default function ReviewForm({
	review,
	url,
	buttonText,
	onSuccess,
	method
}: ReviewFormProps) {
	const form = useForm<ReviewFormValues>({
		defaultValues: {
			stars: review?.stars ?? 1,
			message: review?.message ?? ""
		}
	});

	const errorBag = review?.id ? `review.${review.id}` : undefined;
	const errors = useErrors(errorBag);

	function handleSubmit(values: ReviewFormValues) {
		// @ts-ignore
		router.visit(url, {
			data: values,
			preserveScroll: true,
			errorBag,
			onSuccess,
			method
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-3"
			>
				<FormField
					name="stars"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rating</FormLabel>
							<FormControl>
								<RatingInput
									value={field.value}
									onChange={field.onChange}
									size={6}
								/>
							</FormControl>
							<FormMessage>{errors.stars}</FormMessage>
						</FormItem>
					)}
				/>

				<FormInput
					name="message"
					control={form.control}
					error={errors.message}
					textarea
				/>

				<Button type="submit">{buttonText}</Button>
			</form>
		</Form>
	);
}
