import React from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { ReactNode } from "react";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/input/FormInput";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

type Data = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

export default function Login() {
	const {
		props: { errors }
	} = usePage();

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			password_confirmation: ""
		}
	});

	function handleSubmit(values: Data) {
		router.post(route("register"), values);
	}

	return (
		<>
			<Head title="Register" />

			<Button className="absolute right-5 top-5" variant="ghost" asChild>
				<Link href={route("login")}>Login</Link>
			</Button>

			<CardHeader>
				<CardTitle>Register</CardTitle>
				<CardDescription>
					Become a airbnb member to discover new places
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="w-80 space-y-4"
					>
						<FormInput
							name="name"
							control={form.control}
							error={errors.name}
						/>
						<FormInput
							name="email"
							control={form.control}
							error={errors.email}
						/>

						<FormInput
							type="password"
							name="password"
							control={form.control}
							error={errors.password}
						/>

						<FormInput
							type="password"
							name="password_confirmation"
							label="Confirm Password"
							control={form.control}
							error={errors.password_confirmation}
						/>

						<Button type="submit" className="w-full">
							Register
						</Button>
					</form>
				</Form>
			</CardContent>
		</>
	);
}

Login.layout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
