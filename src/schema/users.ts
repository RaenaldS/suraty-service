import { z } from "zod";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 500000;

export const UserSchema = z
  .object({
    user_id: z.number().optional(),
    user_nama: z.string().min(5),
    user_nip: z.string(),
    user_email: z.string(),
    user_level: z.coerce.number({
      required_error: "Level is required",
    }),
    user_hp: z.string({
      required_error: "No HP is required",
    }),
    user_alamat: z.string({
      required_error: "alamat is required",
    }),
    user_jabatan: z.coerce.number({
      required_error: "Jabatan is required",
      invalid_type_error: "silahkan Pilih Jabatan!",
    }),
    user_name: z
      .string({
        required_error: "username is required",
      })
      .min(5, { message: "Minimal 5 character" }),
    user_pass: z
      .string({
        required_error: "password is required",
      })
      .min(5, { message: "Minimal 5 character" }),
    confirm_password: z.string(),
    user_image: z
      .any()
      .refine((files) => files?.length == 1, "Image is required.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  })
  .superRefine(({ confirm_password, user_pass }, ctx) => {
    if (confirm_password != user_pass) {
      ctx.addIssue({
        code: "custom",
        message: "The password did not match",
        path: ["confirm_password"],
      });
    }
  });

export const UserEditSchema = z
  .object({
    user_nama: z.string().min(5),
    user_nip: z.string(),
    user_email: z.string(),
    user_level: z.coerce.number({
      required_error: "Level is required",
    }),
    user_hp: z.string({
      required_error: "No HP is required",
    }),
    user_alamat: z.string({
      required_error: "alamat is required",
    }),
    user_jabatan: z.coerce.number({
      required_error: "Jabatan is required",
      invalid_type_error: "silahkan Pilih Jabatan!",
    }),
    user_name: z
      .string({
        required_error: "username is required",
      })
      .min(5, { message: "Minimal 5 character" }),
    user_pass: z
      .string({
        required_error: "password is required",
      })
      .optional(),
    confirm_password: z.string(),
    user_image: z.any().optional(),
  })
  .superRefine(({ confirm_password, user_pass }, ctx) => {
    if (confirm_password != user_pass) {
      ctx.addIssue({
        code: "custom",
        message: "The password did not match",
        path: ["confirm_password"],
      });
    }
  });
