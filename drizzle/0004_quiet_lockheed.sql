ALTER TABLE "distributorss" RENAME TO "distributors";--> statement-breakpoint
ALTER TABLE "distributors" DROP CONSTRAINT "distributorss_slug_unique";--> statement-breakpoint
ALTER TABLE "distributors" ADD CONSTRAINT "distributors_slug_unique" UNIQUE("slug");