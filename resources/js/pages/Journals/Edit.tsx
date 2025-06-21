import { useForm, router, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { useEffect } from 'react';

const tagLabels = {
    jobscope: "✅ Within Job Scope",
    extra: "🌟 Extra Effort",
    learning: "🧠 Learning",
    blocker: "❌ Issue",
};

type JournalEditProps = {
    journal: {
        id: number;
        content: string;
        tag: keyof typeof tagLabels;
        created_at: string;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Journals', href: '/journals' },
    { title: 'Edit Entry', href: '#' },
];

export default function EditJournal({ journal }: JournalEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        content: journal.content,
        tag: journal.tag,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('journals.update', journal.id), {
            onSuccess: () => {
                toast.success("Entry updated successfully!");
                router.visit(route('journals.index'));
            },
            onError: () => {
                toast.error("Something went wrong. Please check the fields.");
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Journal Entry" />

            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">📝 Edit Journal Entry</h1>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardContent className="space-y-4 pt-6">
                            <Textarea
                                placeholder="Update your journal entry"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className={errors.content ? 'border-red-500' : ''}
                            />
                            {errors.content && (
                                <p className="text-sm text-red-500">{errors.content}</p>
                            )}

                            <div className="flex items-center gap-4">
                                <Select
                                    value={data.tag}
                                    onValueChange={(v) => setData('tag', v as JournalEditProps['journal']['tag'])}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select tag" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(tagLabels).map(([key, label]) => (
                                            <SelectItem key={key} value={key}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.tag && (
                                    <p className="text-sm text-red-500">{errors.tag}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="secondary" onClick={() => router.visit(route('journals.index'))}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
