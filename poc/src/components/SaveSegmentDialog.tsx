import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SchemaDropdown from "./SchemaDropdown";

interface SchemaOption {
    label: string;
    value: string;
}

export default function SaveSegmentSheet({ open, onClose }: any) {
    const [segmentName, setSegmentName] = useState("");
    const [schemas, setSchemas] = useState<string[]>([]);

    const allSchemas: SchemaOption[] = [
        { label: "First Name", value: "first_name" },
        { label: "Last Name", value: "last_name" },
        { label: "Gender", value: "gender" },
        { label: "Age", value: "age" },
        { label: "Account Name", value: "account_name" },
        { label: "City", value: "city" },
        { label: "State", value: "state" },
    ];

    const availableSchemas = allSchemas.filter(
        (schema) => !schemas.includes(schema.value)
    );

    const handleSchemaChange = (index: number, newValue: string) => {
        const updated = [...schemas];
        updated[index] = newValue;
        setSchemas(updated);
    };

    const handleAddSchema = () => {
        if (schemas.length === 0 || schemas[schemas.length - 1] !== "") {
            if (availableSchemas.length === 0) return;
            setSchemas([...schemas, ""]);
        }
    };


    const handleSaveSegment = async () => {
        const payload = {
            segment_name: segmentName,
            schema: schemas.map((value) => {
                const schemaObj = allSchemas.find((s) => s.value === value);
                return { [value]: schemaObj?.label };
            }),
        };

        console.log("Payload====", payload);

        await fetch("https://webhook.site/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        alert("Segment saved successfully!");
        onClose();
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent
                side="right"
                className="w-[450px] sm:w-[450px] p-0 shadow-lg border-l-0"
            >

                <SheetHeader
                    className={`bg-teal-500 text-white px-4 py-3 items-start`}
                >
                    <SheetTitle className="text-white text-lg font-semibold">Saving Segment</SheetTitle>

                </SheetHeader>

                <div className="p-6 flex flex-col h-[calc(100%-4rem)]">

                    <div className="flex-1 overflow-y-auto pr-2">
                        <div className="grid gap-2 mb-4">
                            <Label className="font-medium text-sm text-gray-700">Enter the Name of the Segment</Label>
                            <Input
                                placeholder="Name of the segment"
                                value={segmentName}
                                onChange={(e) => setSegmentName(e.target.value)}
                                className="mt-1"
                            />
                            <p className="text-xs text-gray-500 mt-3">
                                To save your segment, you need to add the schemas to build the query.
                            </p>
                        </div>

                        <div className="p-3 bg-blue-50 border border-blue-300 rounded-lg space-y-3">
                            {schemas.map((schemaValue, index) => (
                                <div key={index} className="flex items-center gap-2 w-full">
                                    <div className="flex-1">
                                        <SchemaDropdown
                                            selectedValue={schemaValue}
                                            availableSchemas={[
                                                ...availableSchemas,
                                                ...allSchemas.filter((s) => s.value === schemaValue),
                                            ]}
                                            onSchemaChange={(val: string) => handleSchemaChange(index, val)}
                                            className="w-full"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const removedValue = schemas[index];
                                            const updatedSchemas = schemas.filter((_, i) => i !== index);
                                            setSchemas(updatedSchemas);
                                        }}
                                        className="text-red-500 font-bold px-2 h-10"
                                    >
                                        -
                                    </button>
                                </div>
                            ))}
                        </div>



                        {availableSchemas.length > 0 && (
                            <p
                                onClick={handleAddSchema}
                                className="text-blue-600 text-sm cursor-pointer font-medium hover:underline"
                            >
                                + Add new schema
                            </p>
                        )}
                    </div>
                    <SheetFooter className="mt-6 p-4 border-t bg-gray-100 flex justify-end sm:justify-end -mx-6 -mb-6">
                        <div className="flex gap-3">
                            <Button onClick={handleSaveSegment} className="bg-green-700">Save the Segment</Button>
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>

                        </div>

                    </SheetFooter>
                </div>
            </SheetContent>

        </Sheet>
    );
}
