import { useEffect, useState } from "react";
import { router, usePage, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { toast } from "sonner"
import { Pencil, Trash2 } from "lucide-react";

// Tag display labels
const tagLabels = {
    jobscope: "✅ Within Job Scope",
    extra: "🌟 Extra Effort",
    learning: "🧠 Learning",
    blocker: "❌ Issue",
};

// Journal entry type
type JournalEntry = {
    id: number;
    content: string;
    tag: keyof typeof tagLabels;
    created_at: string; // ISO string from backend
};

// Breadcrumbs for layout
const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Journals", href: "/journals" },
];

export default function Journal() {
    const { journals } = usePage<{ journals: JournalEntry[] }>().props;

    // State
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [entry, setEntry] = useState("");
    const [tag, setTag] = useState<JournalEntry["tag"]>("jobscope");
    const [filter, setFilter] = useState<JournalEntry["tag"] | "all">("all");

    // Sync backend journals into local state
    useEffect(() => {
        setEntries(journals);
    }, [journals]);

    // Random encouragement message
    const encouragements = [
        "Nice job! Keep the momentum going 💪",
        "Great progress today! 🚀",
        "You’re doing awesome work 🌟",
        "Another step forward. Well done! ✅",
        "Proud of your effort today 🙌",
    ];

    // Post new entry
    const handlePost = () => {
        if (!entry.trim()) return;

        router.post(route('journals.store'), {
            content: entry,
            tag,
        }, {
            onSuccess: () => {
                setEntry("");
                router.reload();

                const message = encouragements[Math.floor(Math.random() * encouragements.length)];
                toast("Entry Saved!", {
                    description: message,
                    duration: 3000,
                });
            },
        });
    };

    // Filtered view
    const filteredEntries =
        filter === "all" ? entries : entries.filter((e) => e.tag === filter);


    // Delete entry
    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this entry?')) return;

        router.delete(route('journals.destroy', id), {
            onSuccess: () => {
                toast.success('Entry deleted successfully.');
                router.reload(); // Optional: refresh to show latest
            },
            onError: () => {
                toast.error('Failed to delete the entry.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Work Journal" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {/* Simple dashboard stats */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-xl">
                        <p className="text-sm text-muted-foreground">Entries: {entries.length}</p>
                    </div>
                    <div className="p-4 border rounded-xl">
                        <p className="text-sm text-muted-foreground">Latest: {entries[0]?.content || "-"}</p>
                    </div>
                    <div className="p-4 border rounded-xl">
                        <p className="text-sm text-muted-foreground">Filter: {filter}</p>
                    </div>
                </div>

                {/* Main journal area */}
                <div className="border relative flex-1 overflow-hidden rounded-xl p-6">
                    <div className="max-w-3xl mx-auto space-y-6 w-full">
                        <h1 className="text-2xl font-bold">📝 Work Journal</h1>

                        {/* Entry form */}
                        <Card>
                            <CardContent className="space-y-4 pt-6">
                                <div className="text-sm text-gray-500">
                                    Prompt: What was the most significant accomplishment of your day?
                                </div>

                                <Textarea
                                    placeholder="Contoh: Debug payment API – caching issue solved 🎯"
                                    value={entry}
                                    onChange={(e) => setEntry(e.target.value)}
                                />

                                <div className="flex items-center gap-4">
                                    <Select
                                        onValueChange={(v) => setTag(v as JournalEntry["tag"])}
                                        defaultValue={tag}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(tagLabels).map(([key, label]) => (
                                                <SelectItem key={key} value={key}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Button onClick={handlePost}>Post</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Filter dropdown */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Timeline</h2>
                            <Select
                                onValueChange={(v) => setFilter(v as JournalEntry["tag"] | "all")}
                                defaultValue="all"
                            >
                                <SelectTrigger className="w-[160px]">
                                    <SelectValue placeholder="Filter by tag" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    {Object.entries(tagLabels).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Entry list */}
                        <div className="space-y-4">
                            {filteredEntries.length === 0 ? (
                                <p className="text-sm text-gray-500">Let's fill in your first entry!</p>
                            ) : (
                                filteredEntries.map((entry) => (
                                    <Card key={entry.id}>
                                        <CardContent className="space-y-2 pt-4">
                                            <div className="flex items-center justify-between">
                                                <Badge variant="outline">{tagLabels[entry.tag]}</Badge>
                                                <span className="text-xs text-gray-500">
                                                    {format(new Date(entry.created_at), "dd MMM yyyy, hh:mm a")}
                                                </span>
                                            </div>
                                            <p className="text-sm">{entry.content}</p>

                                            {/* Actions */}
                                            <div className="flex gap-2 justify-end pt-2">
                                                <Link href={route('journals.edit', entry.id)}>
                                                    <Button size="sm" variant="outline">
                                                        <Pencil className="w-4 h-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                </Link>

                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(entry.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
