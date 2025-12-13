import { useCallback, useState } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import {
  Button,
  Card,
  Spinner,
  TextField,
  useToast,
  useThemeColor,
} from "heroui-native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import * as z from "zod";

import { PageLayout } from "@/components/page-layout";
import { useAppTheme } from "@/contexts/app-theme.context";
import { authClient } from "@/libs/auth/client";

const SignInPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isDark } = useAppTheme();
  const { toast } = useToast();
  const themeColorMuted = useThemeColor("muted");
  const [isLoading, setIsLoading] = useState(false);

  const createSignInSchema = () =>
    z.object({
      email: z.email(t("validation.pattern.email")),
      password: z
        .string()
        .min(1, t("validation.required"))
        .min(6, t("auth.password-too-short")),
    });

  const signInSchema = createSignInSchema();
  type SignInFormData = z.infer<typeof signInSchema>;

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      const result = await authClient.signIn.email({
        email: data.email.trim(),
        password: data.password,
        callbackURL: "",
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
        router.replace("/");
      }
    } catch {
      toast.show({
        label: t("error.title"),
        description: t("auth.login-failed"),
        variant: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  });

  const handleSocialSignIn = useCallback(
    async (provider: "github" | "google") => {
      try {
        setIsLoading(true);
        const result = await authClient.signIn.social({
          provider,
          callbackURL: "",
        });

        if (result.error) {
          toast.show({
            label: t("error.title"),
            description: result.error.message,
            variant: "danger",
          });
        }

        if (result.data) {
          router.replace("/");
        }
      } catch {
        toast.show({
          label: t("error.title"),
          description: t("auth.login-failed"),
          variant: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [router, t, toast]
  );

  return (
    <PageLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1">
        <View className="flex-1 justify-center py-10">
          <Card className="w-full p-5" variant="quaternary">
            <Card.Header className="pb-4">
              <Card.Title className="text-2xl">{t("auth.login")}</Card.Title>
              <Card.Description>{t("auth.login-description")}</Card.Description>
            </Card.Header>
            <Card.Body className="gap-4">
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
                  <Spinner size="sm" color={themeColorMuted} />
                ) : null}
                <Button.Label>{t("auth.login")}</Button.Label>
              </Button>
            </Card.Body>

            <Card.Footer className="flex-col gap-3 pt-4">
              <View className="flex-row items-center gap-2">
                <View className="h-px flex-1 bg-divider" />
                <Text className="text-sm text-foreground/50">
                  {t("auth.or")}
                </Text>
                <View className="h-px flex-1 bg-divider" />
              </View>

              <View className="w-full gap-4">
                <Button
                  onPress={() => handleSocialSignIn("github")}
                  isDisabled={isLoading}
                  variant="tertiary"
                  className="w-full">
                  <AntDesign
                    name="github"
                    size={24}
                    color={isDark ? "white" : "black"}
                  />
                  <Button.Label>{t("auth.sign-in-with-github")}</Button.Label>
                </Button>
                <Button
                  onPress={() => handleSocialSignIn("google")}
                  isDisabled={isLoading}
                  variant="tertiary"
                  className="w-full">
                  <AntDesign
                    name="google"
                    size={24}
                    color={isDark ? "white" : "black"}
                  />
                  <Button.Label>{t("auth.sign-in-with-google")}</Button.Label>
                </Button>
              </View>
              <Button
                onPress={() => router.push("/signup")}
                variant="ghost"
                className="w-full flex items-center">
                <Button.Label>{t("auth.sign-up")}</Button.Label>
                <AntDesign
                  name="arrow-right"
                  size={16}
                  color={isDark ? "white" : "black"}
                />
              </Button>
            </Card.Footer>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </PageLayout>
  );
};

export default SignInPage;
