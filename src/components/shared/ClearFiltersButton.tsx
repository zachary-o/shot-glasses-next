"use client"

import { Button } from "@/components/ui/button"
import { FILTER_KEYS } from "@/consts"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"

export default function ClearFiltersButton({
  className,
}: {
  className?: string
}) {
  const t = useTranslations("HomePage")
  const router = useRouter()
  const searchParams = useSearchParams()

  const hasActiveFilters = FILTER_KEYS.some((key) => searchParams.has(key))
  
  const handleClear = () => {
    router.push("/")
  }

  if (!hasActiveFilters) return null

  return (
    <Button
      variant="ghost"
      onClick={handleClear}
      className={cn("animated-button gap-1", className)}
    >
      <X size={14} />
      <span>{t("clearFilters")}</span>
    </Button>
  )
}
