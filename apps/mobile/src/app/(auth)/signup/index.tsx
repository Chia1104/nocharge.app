import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Button, Card, Spinner, TextField, useToast } from "heroui-native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import * as z from "zod";

import { PageLayout } from "@/components/page-layout";
import { authClient } from "@/libs/auth/client";

const SignUpPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const createSignUpSchema = () =>
    z.object({
      name: z
        .string()
        .min(1, t("validation.required"))
        .min(2, t("auth.name-too-short")),
      email: z.email(t("validation.pattern.email")),
      password: z
        .string()
        .min(1, t("validation.required"))
        .min(6, t("auth.password-too-short")),
    });

  const signUpSchema = createSignUpSchema();
  type SignUpFormData = z.infer<typeof signUpSchema>;

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);

    try {
      const result = await authClient.signUp.email({
        email: data.email.trim(),
        password: data.password,
        name: data.name.trim(),
        callbackURL: "/(auth)/signin",
      });

      if (result.error) {
        toast.show({
          label: t("error.title"),
          description: result.error.message,
          variant: "danger",
        });
        return;
      }

      if (result.data) {
        toast.show({
          label: t("auth.signup-success"),
          description: t("auth.signup-success-description"),
          variant: "success",
        });
        router.replace("/(auth)/signin");
      }
    } catch {
      toast.show({
        label: t("error.title"),
        description: t("auth.signup-failed"),
        variant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <PageLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1">
        <View className="flex-1 justify-center py-10">
          <Card className="w-full p-5">
            <Card.Header className="pb-4">
              <Card.Title className="text-2xl">{t("auth.signup")}</Card.Title>
              <Card.Description>
                {t("auth.signup-description")}
              </Card.Description>
            </Card.Header>
            <Card.Body className="gap-4">
              <View className="gap-2">
                <Controller
                  control={form.control}
                  name="name"
                  render={({
                    field: { onChange, onBlur, value },
                    formState: { errors },
                  }) => (
                    <TextField isInvalid={!!errors.name} isRequired>
                      <TextField.Label>{t("auth.name")}</TextField.Label>
                      <TextField.Input
                        placeholder={t("auth.name-placeholder")}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="words"
                      />
                      <TextField.ErrorMessage>
                        {errors.name?.message}
                      </TextField.ErrorMessage>
                    </TextField>
                  )}
                />
              </View>

              <View className="gap-2">
                <Controller
                  control={form.control}
                  name="email"
                  render={({
                    field: { onChange, onBlur, value },
                    formState: { errors },
                  }) => (
                    <TextField isInvalid={!!errors.email} isRequired>
                      <TextField.Label>{t("auth.email")}</TextField.Label>
                      <TextField.Input
                        placeholder={t("auth.email-placeholder")}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="none"
                        inputMode="email"
                      />
                      <TextField.ErrorMessage>
                        {errors.email?.message}
                      </TextField.ErrorMessage>
                    </TextField>
                  )}
                />
              </View>

              <View className="gap-2">
                <Controller
                  control={form.control}
                  name="password"
                  render={({
                    field: { onChange, onBlur, value },
                    formState: { errors },
                  }) => (
                    <TextField isInvalid={!!errors.password} isRequired>
                      <TextField.Label>{t("auth.password")}</TextField.Label>
                      <TextField.Input
                        placeholder={t("auth.password-placeholder")}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        secureTextEntry
                      />
                      <TextField.ErrorMessage>
                        {errors.password?.message}
                      </TextField.ErrorMessage>
                    </TextField>
                  )}
                />
              </View>

              <Button
                onPress={onSubmit}
                isDisabled={isLoading}
                className="mt-2 w-full">
                {isLoading ? (
                  <View className="flex-row items-center gap-2">
                    <Spinner size="sm" color="current" />
                    <Text>{t("auth.signing-up")}</Text>
                  </View>
                ) : (
                  <Text>{t("auth.signup")}</Text>
                )}
              </Button>
            </Card.Body>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </PageLayout>
  );
};

export default SignUpPage;
