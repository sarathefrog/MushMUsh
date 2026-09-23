"use client";

import { useState } from "react";
import { uploadProofAction } from "@/actions/orders";
import { strings } from "@/lib/strings";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface ProofUploadProps {
  orderId: string;
  onSuccess: () => void;
}

export function ProofUpload({ orderId, onSuccess }: ProofUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("proof", file);

    try {
      const res = await uploadProofAction(orderId, formData);
      if (!res.success) {
        throw new Error(res.error || "Failed to upload proof");
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || "An error occurred during upload.");
      setLoading(false);
    }
  };

  return (
    <Card className="bg-surface border-border">
      <h3 className="font-heading text-lg font-bold mb-4">
        {strings.orderUploadProof}
      </h3>
      <p className="text-sm text-muted mb-6">{strings.orderUploadProofSub}</p>

      {error && (
        <div className="bg-danger/10 text-danger p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            id="proof-file"
            className="sr-only"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <label
            htmlFor="proof-file"
            className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-border rounded-card cursor-pointer hover:border-primary hover:bg-white transition-colors text-sm font-medium"
          >
            {file ? file.name : strings.orderSelectPhoto}
          </label>
        </div>

        <Button
          fullWidth
          disabled={!file || loading}
          onClick={handleUpload}
        >
          {loading ? strings.loading : strings.orderSubmitProof}
        </Button>
      </div>
    </Card>
  );
}
