import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SchemaDropdown({
  availableSchemas,
  selectedValue,
  onSchemaChange,
}: any) {
  return (
    <div>
      <Select
        value={selectedValue}
        onValueChange={(value) => onSchemaChange(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Add schema to segment" />
        </SelectTrigger>
        <SelectContent>
          {availableSchemas.map((schema: any) => (
            <SelectItem key={schema.value} value={schema.value}>
              {schema.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
