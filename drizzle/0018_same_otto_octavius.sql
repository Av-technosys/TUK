CREATE TABLE "product_distributor" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"distributor_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "product_distributor" ADD CONSTRAINT "product_distributor_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_distributor" ADD CONSTRAINT "product_distributor_distributor_id_distributors_id_fk" FOREIGN KEY ("distributor_id") REFERENCES "public"."distributors"("id") ON DELETE no action ON UPDATE no action;