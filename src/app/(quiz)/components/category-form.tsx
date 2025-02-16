"use client";

import { Button } from "@/components/ui/button";
import { Category, categories } from "@/lib/quiz";
import { useState } from "react";

interface CategoryFormProps {
  onSubmit: (categories: Category[]) => void;
  isLoading?: boolean;
  stop?: () => void;
}

export default function CategoryForm({
  onSubmit,
  isLoading,
}: CategoryFormProps) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) return;
    onSubmit(selectedCategories);
  };

  const toggleCategory = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-wrap justify-center gap-2 max-w-md">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  isSelected
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }
              `}
            >
              {category}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            setSelectedCategories(
              selectedCategories.length === categories.length
                ? []
                : [...categories]
            );
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              selectedCategories.length === categories.length
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }
          `}
        >
          {selectedCategories.length === categories.length
            ? "Deselect All"
            : "Select All"}
        </button>
      </div>
      <div className="relative flex justify-center">
        <Button
          type="submit"
          disabled={selectedCategories.length === 0 || isLoading}
          className="w-auto"
        >
          {isLoading ? "Generating..." : "Generate Quiz"}
        </Button>
        {isLoading && (
          <Button
            variant="link"
            className="absolute -bottom-10"
            onClick={() => stop()}
          >
            Stop
          </Button>
        )}
      </div>
    </form>
  );
}
