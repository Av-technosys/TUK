ALTER TABLE "distributorss" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "distributorss" ADD CONSTRAINT "distributorss_slug_unique" UNIQUE("slug");