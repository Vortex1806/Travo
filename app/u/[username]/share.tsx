'use client'

import { useState, useCallback, useEffect } from 'react'
import { Share2, X, Copy, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function Share() {
    const [isOpen, setIsOpen] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    const [url, setUrl] = useState('')

    const handleShare = useCallback(() => {
        setIsOpen(true)
    }, [])

    const handleClose = useCallback(() => {
        setIsOpen(false)
        setIsCopied(false)
    }, [])

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(url).then(() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000) // Reset copied state after 2 seconds
        })
    }, [url])

    // This effect will run only in the browser
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrl(window.location.href)
        }
    }, [])

    return (
        <>
            <Button onClick={handleShare} variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Share page</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Button
                                variant="outline"
                                className="justify-start text-left font-normal"
                                onClick={copyToClipboard}
                            >
                                <span className="truncate">{url}</span>
                            </Button>
                        </div>
                        <Button
                            size="icon"
                            className="px-3"
                            onClick={copyToClipboard}
                        >
                            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            <span className="sr-only">Copy</span>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
