import React, { useState } from "react";
import { attributes as _attributes } from "@/lib/constants";
import { Attribute } from "@/types";
import { Button } from "@/components/ui/button";

interface AttributesCardProps {
    attributes: string[];
}

export default function AttributesCard({ attributes }: AttributesCardProps) {
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
                View {collapsed ? "less" : "all"}
            </Button>
        </div>
    );
}