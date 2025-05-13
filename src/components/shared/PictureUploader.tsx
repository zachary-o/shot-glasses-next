"use client"

import { useTranslations } from "next-intl"
import { CSSProperties, useCallback, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "../ui/button"
import { X } from "lucide-react"

const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "522px",
  padding: "20px",
  borderWidth: 1,
  borderRadius: 20,
  borderColor: "#1C1B1F",
  borderStyle: "dashed",
  backgroundColor: "transparent",
  color: "var(--color-black)",
  outline: "none",
  transition: "border .24s ease-in-out",
}

const focusedStyle: CSSProperties = {
  borderColor: "#[var(--color-red)]",
}

const acceptStyle: CSSProperties = {
  borderColor: "#504DCC",
  backgroundColor: "#E6E6FF",
}

const rejectStyle: CSSProperties = {
  borderColor: "#ff1744",
}

const PictureUploader = () => {
  const t = useTranslations("Admin")
  const [previewImg, setPreviewImg] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const file: File = acceptedFiles[0]
    const previewUrl = URL.createObjectURL(file)
    setPreviewImg(previewUrl)
  }, [])

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop, accept: { "image/*": [] } })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <CustomIcon
          color={
            isDragAccept ? "#504DCC" : isDragReject ? "#FF1744" : "#1C1B1F"
          }
        />

        {/* DRAG'N'DROP TEXT */}
        <div className="mb-2">
          {isDragAccept ? (
            <p className="text-[#504DCC]">{t("dragAccept")}</p>
          ) : isDragReject ? (
            <p className="text-[#ff1744]">{t("dragRejected")}</p>
          ) : (
            <p className="whitespace-pre-line text-center">
              {t("dragNdrop")}&nbsp;
              <span className="text-[var(--color-red)] font-bold">
                {t("dragNdropSub")}
              </span>
            </p>
          )}
        </div>

        {/* IMAGE PREVIEW */}
        {previewImg && (
          <div className="relative">
            <img width={200} src={previewImg} alt="preview image" />
            <Button
              className="absolute w-[20px] h-[20px] bg-white -top-2 -right-2 cursor-pointer border border-[#1C1B1F] rounded-full"
              size="icon"
              variant="ghost"
              onClick={(event) => {
                event.stopPropagation()
                setPreviewImg(null)
              }}
            >
              <X width={16} height={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PictureUploader

// DRAG'N'DROP SVG

type IconProps = {
  color?: string
  width?: number
  height?: number
}

const CustomIcon: React.FC<IconProps> = ({
  color = "#1C1B1F",
  width = 64,
  height = 63,
}) => (
  <svg
    className="mb-[10px]"
    width={width}
    height={height}
    viewBox="0 0 64 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="64"
      height="63"
    >
      <rect x="0.5" width="63" height="63" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0)">
      <path
        d="M13.625 55.125C12.1812 55.125 10.9453 54.6109 9.91719 53.5828C8.88906 52.5547 8.375 51.3187 8.375 49.875V13.125C8.375 11.6812 8.88906 10.4453 9.91719 9.41719C10.9453 8.38906 12.1812 7.875 13.625 7.875H37.25V13.125H13.625V49.875H50.375V26.25H55.625V49.875C55.625 51.3187 55.1109 52.5547 54.0828 53.5828C53.0547 54.6109 51.8187 55.125 50.375 55.125H13.625ZM45.125 23.625V18.375H39.875V13.125H45.125V7.875H50.375V13.125H55.625V18.375H50.375V23.625H45.125ZM16.25 44.625H47.75L37.9062 31.5L30.0312 42L24.125 34.125L16.25 44.625Z"
        fill={color}
      />
    </g>
  </svg>
)
