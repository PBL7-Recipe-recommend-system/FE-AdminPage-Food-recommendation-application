import Heading from '@/components/shared/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from '@/routes/hooks';
import { ChevronLeftIcon, Edit, Save, ShareIcon } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router-dom';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  formatDate,
  getImage,
  getTimeFromData,
  handleChangeTotalTime,
  handleHourChange,
  handleMinuteChange
} from '@/lib/utils';
import IngredientTable from '@/pages/recipes/components/ingredient-table';
import InstructionTable from '@/pages/recipes/components/instruction-table';
import { useEffect, useState } from 'react';
import {
  useGetDetailIngredients,
  useGetDetailInstructions,
  useGetDetailRecipes
} from './queries/queries';
import { updateDetailedRecipe } from '@/lib/recipes-api';
import { useQueryClient } from '@tanstack/react-query';
export default function RecipeDetailPage() {
  const [searchParams] = useSearchParams();
  const recipeIdParam = useParams().recipeId;
  const recipeId = Number(recipeIdParam) || 0;
  const page = Number(searchParams.get('page') || 1);
  const [editOverview, setEditOverview] = useState(false);
  const [editNutrition, setEditNutrition] = useState(false);
  const { data: detailsIngredient, isLoading: ingredientLoading } =
    useGetDetailIngredients(recipeId);
  const { data: detailsRecipe, isLoading: detailLoading } =
    useGetDetailRecipes(recipeId);
  const { data: detailsInstructions, isLoading: instructionsLoading } =
    useGetDetailInstructions(recipeId);
  const ingredients = detailsIngredient;
  const totalIngredients = detailsIngredient?.length; //1000
  const pageCount = 1;
  const router = useRouter();
  const images = getImage(detailsRecipe?.images);
  const queryClient = useQueryClient();

  const [overviewFormData, setOverviewFormData] = useState({
    name: detailsRecipe?.name,
    authorName: detailsRecipe?.authorName,
    description: detailsRecipe?.description,
    cookTime: detailsRecipe?.cookTime,
    datePublished: detailsRecipe?.datePublished,
    prepTime: detailsRecipe?.prepTime,
    recipeCategory: detailsRecipe?.recipeCategory,
    totalTime: detailsRecipe?.totalTime,
    aggregatedRatings: detailsRecipe?.aggregatedRatings,
    reviewCount: detailsRecipe?.reviewCount,
    calories: detailsRecipe?.calories
  });

  const [nutritionFormData, setNutritionFormData] = useState({
    fatContent: detailsRecipe?.fatContent,
    saturatedFatContent: detailsRecipe?.saturatedFatContent,
    cholesterolContent: detailsRecipe?.cholesterolContent,
    sodiumContent: detailsRecipe?.sodiumContent,
    carbonhydrateContent: detailsRecipe?.carbonhydrateContent,
    fiberContent: detailsRecipe?.fiberContent,
    sugarContent: detailsRecipe?.sugarContent,
    proteinContent: detailsRecipe?.proteinContent,
    recipeServings: detailsRecipe?.recipeServings,
    calories: detailsRecipe?.calories
  });
  useEffect(() => {
    setOverviewFormData({
      name: detailsRecipe?.name,
      authorName: detailsRecipe?.authorName,
      description: detailsRecipe?.description,
      cookTime: detailsRecipe?.cookTime,
      datePublished: detailsRecipe?.datePublished,
      prepTime: detailsRecipe?.prepTime,
      recipeCategory: detailsRecipe?.recipeCategory,
      totalTime: detailsRecipe?.totalTime,
      aggregatedRatings: detailsRecipe?.aggregatedRatings,
      reviewCount: detailsRecipe?.reviewCount,
      calories: detailsRecipe?.calories
    });
    setNutritionFormData({
      fatContent: detailsRecipe?.fatContent,
      saturatedFatContent: detailsRecipe?.saturatedFatContent,
      cholesterolContent: detailsRecipe?.cholesterolContent,
      sodiumContent: detailsRecipe?.sodiumContent,
      carbonhydrateContent: detailsRecipe?.carbonhydrateContent,
      fiberContent: detailsRecipe?.fiberContent,
      sugarContent: detailsRecipe?.sugarContent,
      proteinContent: detailsRecipe?.proteinContent,
      recipeServings: detailsRecipe?.recipeServings,
      calories: detailsRecipe?.calories
    });
  }, [detailsRecipe]);

  useEffect(() => {
    console.log(overviewFormData.prepTime, overviewFormData.cookTime);
    console.log(overviewFormData.totalTime);
  }, [overviewFormData]);

  if (ingredientLoading || detailLoading || instructionsLoading) {
    return <h1>Loading!!!</h1>;
  }

  const handleSubmitOverviewForm = async () => {
    const res = await updateDetailedRecipe(recipeId, overviewFormData);
    console.log(res)
    queryClient.invalidateQueries({ queryKey: ['detailRecipes', recipeId] });
  }

  const handleSubmitNutritionForm = async () => {
    const res = await updateDetailedRecipe(recipeId, nutritionFormData);
    console.log(res)
    queryClient.invalidateQueries({ queryKey: ['detailRecipes', recipeId] });
  }



  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <Heading title={'Recipe Details'} />
        <div className="flex justify-end gap-3">
          <Button>
            <ShareIcon className="h-4 w-4" />
            Share
          </Button>
          <Button onClick={() => router.back()}>
            <ChevronLeftIcon className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
      <div className="grid  grid-cols-1 gap-6 py-6 lg:grid-cols-4">
        <div className=" col-span-1 flex flex-col gap-6 lg:col-span-1">
          <Card className="bg-secondary  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between font-bold">
              <p className="text-xl"> Images</p>
              <Badge className="bg-green-600">Active</Badge>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <Carousel>
                <CarouselContent>
                  {images &&
                    images.map((image, index) => (
                      <CarouselItem>
                        <img src={image} className="rounded-sm " />
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
          <Card className="bg-secondary shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm">
            <CardHeader className="pb-2 text-center font-bold">
              Description
            </CardHeader>
            <CardContent className="text-sm">
              {editOverview ? (
                <Textarea
                  className="text-muted-foreground"
                  defaultValue={overviewFormData?.description}
                  onChange={(event) =>
                    setOverviewFormData((prevState) => ({
                      ...prevState,
                      description: event.target.value
                    }))
                  }
                />
              ) : (
                <p className="text-muted-foreground">
                  {detailsRecipe?.description}
                </p>
              )}
            </CardContent>
          </Card>
          <Card className="bg-secondary shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm">
            <CardHeader className="pb-2 text-center font-bold">
              Last Login
            </CardHeader>
            <CardContent className="text-center text-sm">
              12 Aug 2022 9:30 AM
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1 overflow-hidden bg-secondary shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] drop-shadow-sm lg:col-span-3">
          <Tabs
            defaultValue="overview"
            style={{
              height: '90%'
            }}
            onValueChange={() => {
              setEditNutrition(false);
              setEditOverview(false);
            }}
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instruction">Instruction</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>
            {/* OVERVIEW SECTION */}
            <TabsContent
              value="overview"
              style={{
                height: '100%'
              }}
            >
              <Card
                style={{
                  height: '100%'
                }}
              >
                <CardHeader className="text-xl font-bold">
                  <div className="flex flex-row justify-between">
                    <p>Recipe Overview</p>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setEditOverview(!editOverview)
                        if (editOverview) {
                          handleSubmitOverviewForm()
                        }
                      }}
                    >
                      {editOverview ? <Save /> : <Edit />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent
                  style={{
                    height: '100%'
                  }}
                >
                  <div className="grid grid-cols-2 gap-y-4">
                    <div className="mr-3">
                      <p className="font-bold text-black">Name</p>
                      {editOverview ? (
                        <Input
                          className="text-muted-foreground"
                          defaultValue={overviewFormData?.name}
                          onChange={(event) =>
                            setOverviewFormData((prevState) => ({
                              ...prevState,
                              name: event.target.value
                            }))
                          }
                        />
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.name}
                        </p>
                      )}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Author Name</p>

                      <p className="text-muted-foreground">
                        {detailsRecipe?.authorName}
                      </p>
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Cook Time</p>
                      {editOverview ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={
                              getTimeFromData(overviewFormData?.cookTime).hours
                            }
                            type="number"
                            placeholder="Hours"
                            onChange={(event) =>
                              setOverviewFormData((prevState) => ({
                                ...prevState,
                                cookTime: handleHourChange(
                                  parseInt(event.target.value, 10),
                                  prevState.cookTime
                                ),
                                totalTime: handleChangeTotalTime(
                                  prevState.prepTime,
                                  handleHourChange(
                                    parseInt(event.target.value, 10),
                                    prevState.cookTime
                                  )
                                )
                              }))
                            }
                          />
                          <span className="mx-3">Hours</span>
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={
                              getTimeFromData(overviewFormData?.cookTime)
                                .minutes
                            }
                            type="number"
                            max={60}
                            placeholder="Minutes"
                            onChange={(event) =>
                              setOverviewFormData((prevState) => ({
                                ...prevState,
                                cookTime: handleMinuteChange(
                                  parseInt(event.target.value, 10),
                                  prevState.cookTime
                                ),
                                totalTime: handleChangeTotalTime(
                                  prevState.prepTime,
                                  handleMinuteChange(
                                    parseInt(event.target.value, 10),
                                    prevState.cookTime
                                  )
                                )
                              }))
                            }
                          />
                          <span className="mx-3">Minutes</span>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.cookTime}
                        </p>
                      )}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Date Published</p>
                      <p className="text-muted-foreground">
                        {detailsRecipe?.datePublished}
                      </p>
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Prepare Time</p>
                      {editOverview ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={
                              getTimeFromData(overviewFormData?.prepTime).hours
                            }
                            type="number"
                            placeholder="Hours"
                            onChange={(event) =>
                              setOverviewFormData((prevState) => ({
                                ...prevState,
                                prepTime: handleHourChange(
                                  parseInt(event.target.value, 10),
                                  prevState.prepTime
                                ),
                                totalTime: handleChangeTotalTime(
                                  handleHourChange(
                                    parseInt(event.target.value, 10),
                                    prevState.prepTime
                                  ),
                                  prevState.cookTime
                                )
                              }))
                            }
                          />
                          <span className="mx-3">Hours</span>
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={
                              getTimeFromData(overviewFormData?.prepTime)
                                .minutes
                            }
                            type="number"
                            max={60}
                            placeholder="Minutes"
                            onChange={(event) =>
                              setOverviewFormData((prevState) => ({
                                ...prevState,
                                prepTime: handleMinuteChange(
                                  parseInt(event.target.value, 10),
                                  prevState.prepTime
                                ),
                                totalTime: handleChangeTotalTime(
                                  handleMinuteChange(
                                    parseInt(event.target.value, 10),
                                    prevState.prepTime
                                  ),
                                  prevState.cookTime
                                )
                              }))
                            }
                          />
                          <span className="mx-3">Minutes</span>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.prepTime}
                        </p>
                      )}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Recipe Category</p>
                      {editOverview ? (
                        <Input
                          className="text-muted-foreground"
                          value={overviewFormData?.recipeCategory}
                          disabled
                        />
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.recipeCategory}
                        </p>
                      )}
                      {/* <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue
                            placeholder="Category"
                            defaultValue={detailsRecipe?.recipeCategory}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {CategoryList.map((category) => (
                            <SelectItem value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select> */}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Total Time</p>
                      {editOverview ? (
                        <Input
                          className="w-1/4 text-muted-foreground"
                          value={overviewFormData?.totalTime}
                          disabled
                        />
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.totalTime}
                        </p>
                      )}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Aggregated Ratings</p>
                      <p className="text-muted-foreground">
                        {detailsRecipe?.aggregatedRatings}
                      </p>
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Review Count</p>
                      <p className="text-muted-foreground">
                        {detailsRecipe?.reviewCount}
                      </p>
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Calories</p>
                      {editOverview ? (
                        <div className="flex flex-row items-center ">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={overviewFormData?.calories}
                            type="number"
                            onChange={(event) =>
                              setOverviewFormData((prevState) => ({
                                ...prevState,
                                calories: event.target.value
                              }))
                            }
                          />
                          <span className="mx-3">Kcal</span>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.calories} Kcal
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* INGREDIENTS SECTION */}
            <TabsContent
              value="ingredients"
              style={{
                height: '100%'
              }}
            >
              <Card
                style={{
                  height: '100%'
                }}
              >
                <CardHeader className="text-xl font-bold">
                  Ingredients Information
                </CardHeader>
                <CardContent
                  style={{
                    height: '100%'
                  }}
                >
                  <IngredientTable
                    ingredients={ingredients}
                    page={page}
                    totalUsers={totalIngredients}
                    pageCount={pageCount}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            {/* INSTRUCTIONS SECTION */}
            <TabsContent
              value="instruction"
              style={{
                height: '100%'
              }}
            >
              <Card
                style={{
                  height: '100%'
                }}
              >
                <CardHeader className="text-xl font-bold">
                  Instructions Information
                </CardHeader>
                <CardContent
                  style={{
                    height: '100%'
                  }}
                >
                  <InstructionTable
                    instructions={detailsInstructions}
                    page={page}
                    totalUsers={totalIngredients}
                    pageCount={pageCount}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            {/* NUTRITION SECTION */}
            <TabsContent
              value="nutrition"
              style={{
                height: '100%'
              }}
            >
              <Card
                style={{
                  height: '100%'
                }}
              >
                <CardHeader className="text-xl font-bold">
                  <div className="flex flex-row justify-between">
                    <p>Nutrition Information</p>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setEditNutrition(!editNutrition)
                        if (editNutrition) {
                          handleSubmitNutritionForm()
                        }
                      }}
                    >
                      {editNutrition ? <Save /> : <Edit />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent
                  style={{
                    height: '100%'
                  }}
                >
                  <div className="grid grid-cols-2 gap-y-4">
                    <div className="mr-3">
                      <p className="font-bold text-black">Fat</p>
                      {editNutrition ? (
                        <div className="flex flex-row items-center ">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={nutritionFormData?.fatContent}
                            type="number"
                            onChange={(event) =>
                              setNutritionFormData((prevState) => ({
                                ...prevState,
                                fatContent: event.target.value
                              }))
                            }
                          />
                          <span className="mx-3">gram</span>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.fatContent} g
                        </p>
                      )}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Saturated Fat</p>
                      {editNutrition ? (
                        <div className="flex flex-row items-center ">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={
                              nutritionFormData?.saturatedFatContent
                            }
                            type="number"
                            onChange={(event) =>
                              setNutritionFormData((prevState) => ({
                                ...prevState,
                                saturatedFatContent: event.target.value
                              }))
                            }
                          />
                          <span className="mx-3">gram</span>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.saturatedFatContent} g
                        </p>
                      )}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Cholesterol</p>
                      {editNutrition ? (
                        <div className="flex flex-row items-center ">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={nutritionFormData?.cholesterolContent}
                            type="number"
                            onChange={(event) =>
                              setNutritionFormData((prevState) => ({
                                ...prevState,
                                cholesterolContent: event.target.value
                              }))
                            }
                          />
                          <span className="mx-3">gram</span>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.cholesterolContent} g
                        </p>
                      )}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Sodium</p>
                      {editNutrition ? (
                        <div className="flex flex-row items-center ">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={nutritionFormData?.sodiumContent}
                            type="number"
                            onChange={(event) =>
                              setNutritionFormData((prevState) => ({
                                ...prevState,
                                sodiumContent: event.target.value
                              }))
                            }
                          />
                          <span className="mx-3">milligram</span>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.sodiumContent} mg
                        </p>
                      )}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Carbohydrate</p>
                      {editNutrition ? (
                        <div className="flex flex-row items-center ">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={
                              nutritionFormData?.carbonhydrateContent
                            }
                            type="number"
                            onChange={(event) =>
                              setNutritionFormData((prevState) => ({
                                ...prevState,
                                carbonhydrateContent: event.target.value
                              }))
                            }
                          />
                          <span className="mx-3">gram</span>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.carbonhydrateContent} g
                        </p>
                      )}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Fiber</p>
                      {editNutrition ? (
                        <div className="flex flex-row items-center ">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={nutritionFormData?.fiberContent}
                            type="number"
                            onChange={(event) =>
                              setNutritionFormData((prevState) => ({
                                ...prevState,
                                fiberContent: event.target.value
                              }))
                            }
                          />
                          <span className="mx-3">gram</span>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.fiberContent} g
                        </p>
                      )}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Sugar</p>
                      {editNutrition ? (
                        <div className="flex flex-row items-center ">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={nutritionFormData?.sugarContent}
                            type="number"
                            onChange={(event) =>
                              setNutritionFormData((prevState) => ({ ...prevState, sugarContent: event.target.value }))
                            }
                          />
                          <span className="mx-3">gram</span>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.sugarContent} g
                        </p>
                      )}
                    </div>

                    <div className="mr-3">
                      <p className="font-bold text-black">Protein</p>
                      {editNutrition ? (
                        <div className="flex flex-row items-center ">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={nutritionFormData?.proteinContent}
                            type="number"
                            onChange={(event) =>
                              setNutritionFormData((prevState) => ({ ...prevState, proteinContent: event.target.value }))
                            }
                          />
                          <span className="mx-3">gram</span>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.proteinContent} g
                        </p>
                      )}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Recipe Servings</p>
                      {editNutrition ? (
                        <div className="flex flex-row items-center ">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={nutritionFormData?.recipeServings}
                            type="number"
                            onChange={(event) =>
                              setNutritionFormData((prevState) => ({ ...prevState, recipeServings: event.target.value }))
                            }
                          />
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.recipeServings}
                        </p>
                      )}
                    </div>
                    <div className="mr-3">
                      <p className="font-bold text-black">Calories</p>
                      {editNutrition ? (
                        <div className="flex flex-row items-center ">
                          <Input
                            className="w-1/5 text-muted-foreground"
                            defaultValue={nutritionFormData?.calories}
                            type="number"
                            onChange={(event) =>
                              setNutritionFormData((prevState) => ({ ...prevState, calories: event.target.value }))
                            }
                          />
                          <span className="mx-3">Kcal</span>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          {detailsRecipe?.calories} Kcal
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* <div className="flex items-center justify-center">
        <InterestChannel title="Interest" />
        <InterestChannel title="Interest" />
        <InterestChannel title="Interest" />
      </div> */}
      {/* <RecipeFeedTable
        users={users}
        page={page}
        totalUsers={totalUsers}
        pageCount={pageCount}
      /> */}
    </div>
  );
}
