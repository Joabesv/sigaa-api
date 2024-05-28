import { HTTP } from '@/session/sigaa-http';
import { Homework, HomeworkData } from '@/courses/resources/attachments/sigaa-homework-student';
import { Quiz, QuizData } from '@/courses/resources/attachments/sigaa-quiz-student';
import { Survey, SurveyData } from '@/courses/resources/attachments/sigaa-survey-student';
import { FileData, File } from '@/resources/sigaa-file';
import { ResourceManager } from '@/resources/sigaa-resource-manager';
import { CourseResourcesFactory } from './sigaa-course-resources-factory';
import { Lesson, LessonData } from './resources/sigaa-lesson-student';
import { News, NewsData } from './resources/sigaa-news-student';
import { CourseStudent } from './sigaa-course-student';
import { CourseForum, ForumData } from '@/courses/resources/forum/sigaa-course-forum-student';
import { WebContent, WebContentData } from '@/courses/resources/attachments/sigaa-web-content-student';

/**
 * Class that stores course resources.
 * @category Internal
 */
export class CourseResourcesManager {
  constructor(
    http: HTTP,
    courseResourcesFactory: CourseResourcesFactory,
    course: CourseStudent
  ) {
    this.lessons = new ResourceManager((options) =>
      courseResourcesFactory.createLessonFromLessonData(
        options,
        http,
        async () => {
          await course.getLessons();
        }
      )
    );

    this.files = new ResourceManager((options) =>
      courseResourcesFactory.createFileFromFileData(options, http, async () => {
        await course.getFiles();
      })
    );

    this.homework = new ResourceManager((options) =>
      courseResourcesFactory.createHomeworkFromHomeworkData(
        options,
        http,
        async () => {
          await course.getHomeworks();
        }
      )
    );

    this.forums = new ResourceManager((options) =>
      courseResourcesFactory.createForumFromForumData(
        options,
        http,
        async () => {
          await course.getForums();
        }
      )
    );

    this.quizzes = new ResourceManager((options) =>
      courseResourcesFactory.createQuizFromQuizData(options, http, async () => {
        await course.getQuizzes();
      })
    );

    this.news = new ResourceManager((options) =>
      courseResourcesFactory.createNewsFromNewsData(options, http, async () => {
        await course.getNews();
      })
    );

    this.webContents = new ResourceManager((options) =>
      courseResourcesFactory.createWebContentFromWebContentData(
        options,
        http,
        async () => {
          await course.getWebContents();
        }
      )
    );

    this.survey = new ResourceManager((options) =>
      courseResourcesFactory.createSurveyFromSurveyData(
        options,
        http,
        async () => {
          await course.getSurveys();
        }
      )
    );
  }

  lessons: ResourceManager<Lesson, LessonData>;
  files: ResourceManager<File, FileData>;
  homework: ResourceManager<Homework, HomeworkData>;
  forums: ResourceManager<CourseForum, ForumData>;
  quizzes: ResourceManager<Quiz, QuizData>;
  survey: ResourceManager<Survey, SurveyData>;
  webContents: ResourceManager<WebContent, WebContentData>;
  news: ResourceManager<News, NewsData>;
}
